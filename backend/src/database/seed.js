const db = require("./db");

console.log("Seeding database...");

db.exec(`
    DELETE FROM tasks;
    DELETE FROM columns;
    DELETE FROM boards;
`);

const boardResult = db
    .prepare(`
        INSERT INTO boards (name)
        VALUES (?)
    `)
    .run("TaskFlow Board");

const boardId = boardResult.lastInsertRowid;

const columnInsert = db.prepare(`
    INSERT INTO columns (board_id, name, position)
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

console.log("Database seeded successfully.");

db.close();