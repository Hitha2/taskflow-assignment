const express = require("express");

const {
    createTask,
    updateTask,
    deleteTask,
    moveTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/move", moveTask);

module.exports = router;