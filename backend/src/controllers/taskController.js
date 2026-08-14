const db = require("../database/db");

// CREATE TASK
function createTask(req, res) {
    try {
        const {
            title,
            description,
            priority = "Medium",
            columnId,
        } = req.body;

        // Backend validation
        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Task title is required",
            });
        }

        if (!columnId) {
            return res.status(400).json({
                error: "Column is required",
            });
        }

        const validPriorities = ["Low", "Medium", "High"];

        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                error: "Invalid priority",
            });
        }

        const column = db
            .prepare(`
                SELECT id
                FROM columns
                WHERE id = ?
            `)
            .get(columnId);

        if (!column) {
            return res.status(400).json({
                error: "Column not found",
            });
        }

        const result = db
            .prepare(`
                INSERT INTO tasks
                (column_id, title, description, priority)
                VALUES (?, ?, ?, ?)
            `)
            .run(
                columnId,
                title.trim(),
                description || null,
                priority
            );

        const task = db
            .prepare(`
                SELECT *
                FROM tasks
                WHERE id = ?
            `)
            .get(result.lastInsertRowid);

        return res.status(201).json(task);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to create task",
        });
    }
}


// UPDATE TASK
function updateTask(req, res) {
    try {
        const taskId = req.params.id;

        const {
            title,
            description,
            priority,
        } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Task title is required",
            });
        }

        const validPriorities = ["Low", "Medium", "High"];

        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                error: "Invalid priority",
            });
        }

        const existingTask = db
            .prepare(`
                SELECT id
                FROM tasks
                WHERE id = ?
            `)
            .get(taskId);

        if (!existingTask) {
            return res.status(404).json({
                error: "Task not found",
            });
        }

        db.prepare(`
            UPDATE tasks
            SET
                title = ?,
                description = ?,
                priority = ?
            WHERE id = ?
        `).run(
            title.trim(),
            description || null,
            priority,
            taskId
        );

        const updatedTask = db
            .prepare(`
                SELECT *
                FROM tasks
                WHERE id = ?
            `)
            .get(taskId);

        return res.json(updatedTask);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to update task",
        });
    }
}


// DELETE TASK
function deleteTask(req, res) {
    try {
        const taskId = req.params.id;

        const result = db
            .prepare(`
                DELETE FROM tasks
                WHERE id = ?
            `)
            .run(taskId);

        if (result.changes === 0) {
            return res.status(404).json({
                error: "Task not found",
            });
        }

        return res.json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to delete task",
        });
    }
}


// MOVE TASK
function moveTask(req, res) {
    try {
        const taskId = req.params.id;
        const { columnId } = req.body;

        if (!columnId) {
            return res.status(400).json({
                error: "Column is required",
            });
        }

        const column = db
            .prepare(`
                SELECT id
                FROM columns
                WHERE id = ?
            `)
            .get(columnId);

        if (!column) {
            return res.status(400).json({
                error: "Column not found",
            });
        }

        const result = db
            .prepare(`
                UPDATE tasks
                SET column_id = ?
                WHERE id = ?
            `)
            .run(columnId, taskId);

        if (result.changes === 0) {
            return res.status(404).json({
                error: "Task not found",
            });
        }

        const task = db
            .prepare(`
                SELECT *
                FROM tasks
                WHERE id = ?
            `)
            .get(taskId);

        return res.json(task);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to move task",
        });
    }
}


module.exports = {
    createTask,
    updateTask,
    deleteTask,
    moveTask,
};