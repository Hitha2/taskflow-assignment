const express = require("express");
const cors = require("cors");

const db = require("./database/db");

const taskRoutes = require("./routes/taskRoutes");
const boardRoutes = require("./routes/boardRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// Automatically create initial board if database is empty
function initializeDatabase() {

    const board = db
        .prepare("SELECT id FROM boards LIMIT 1")
        .get();

    if (board) {
        console.log("Database already contains a board.");
        return;
    }

    console.log("No board found. Creating initial TaskFlow board...");

    const boardResult = db
        .prepare(`
            INSERT INTO boards (name)
            VALUES (?)
        `)
        .run("TaskFlow Board");

    const boardId = boardResult.lastInsertRowid;


    const columnInsert = db.prepare(`
        INSERT INTO columns
        (board_id, name, position)
        VALUES (?, ?, ?)
    `);


    const todoId = columnInsert.run(
        boardId,
        "To Do",
        1
    ).lastInsertRowid;


    const progressId = columnInsert.run(
        boardId,
        "In Progress",
        2
    ).lastInsertRowid;


    const doneId = columnInsert.run(
        boardId,
        "Done",
        3
    ).lastInsertRowid;


    const taskInsert = db.prepare(`
        INSERT INTO tasks
        (column_id, title, description, priority)
        VALUES (?, ?, ?, ?)
    `);


    taskInsert.run(
        todoId,
        "Create Homepage",
        "Build the TaskFlow homepage",
        "High"
    );


    taskInsert.run(
        todoId,
        "Fix Navigation",
        "Fix navigation issues",
        "Medium"
    );


    taskInsert.run(
        progressId,
        "Build Backend API",
        "Create Express REST API",
        "High"
    );


    taskInsert.run(
        doneId,
        "Setup Database",
        "Create SQLite database",
        "Low"
    );


    console.log("Initial TaskFlow board created successfully.");
}


initializeDatabase();


app.use(cors());

app.use(express.json());


app.get("/api/health", (req, res) => {

    res.json({
        message: "TaskFlow API is running",
    });

});


app.use("/api/tasks", taskRoutes);

app.use("/api/board", boardRoutes);


app.use((req, res) => {

    res.status(404).json({
        error: "Route not found",
    });

});


app.listen(PORT, () => {

    console.log(
        `TaskFlow backend running on port ${PORT}`
    );

});