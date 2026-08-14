const express = require("express");

const {
    getBoard,
    getTaskCountPerColumn,
    getTasksByPriority,
} = require("../queries/taskQueries");

const router = express.Router();

// Get complete board
router.get("/", (req, res) => {
    try {
        const board = getBoard();

        if (!board) {
            return res.status(404).json({
                error: "Board not found",
            });
        }

        res.json(board);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to load board",
        });
    }
});


// Task count per column
router.get("/:id/task-counts", (req, res) => {
    try {
        const counts = getTaskCountPerColumn(
            req.params.id
        );

        res.json(counts);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to load task counts",
        });
    }
});


// Tasks by priority
router.get("/priority/:priority", (req, res) => {
    try {
        const priority = req.params.priority;

        const validPriorities = [
            "Low",
            "Medium",
            "High",
        ];

        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                error: "Invalid priority",
            });
        }

        const tasks = getTasksByPriority(priority);

        res.json(tasks);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to load tasks",
        });
    }
});

module.exports = router;