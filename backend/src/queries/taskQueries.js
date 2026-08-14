const db = require("../database/db");

// Get board with columns and tasks
function getBoard() {
    const board = db
        .prepare(`
            SELECT id, name
            FROM boards
            LIMIT 1
        `)
        .get();

    if (!board) {
        return null;
    }

    const columns = db
        .prepare(`
            SELECT id, name, position
            FROM columns
            WHERE board_id = ?
            ORDER BY position
        `)
        .all(board.id);

    const tasks = db
        .prepare(`
            SELECT
                id,
                column_id,
                title,
                description,
                priority,
                created_at
            FROM tasks
            ORDER BY created_at DESC
        `)
        .all();

    return {
        ...board,
        columns: columns.map((column) => ({
            ...column,
            tasks: tasks.filter(
                (task) => task.column_id === column.id
            ),
        })),
    };
}

// Query 1:
// Count tasks per column
function getTaskCountPerColumn(boardId) {
    return db
        .prepare(`
            SELECT
                c.id,
                c.name,
                COUNT(t.id) AS task_count
            FROM columns c
            LEFT JOIN tasks t
                ON t.column_id = c.id
            WHERE c.board_id = ?
            GROUP BY c.id, c.name
            ORDER BY c.position
        `)
        .all(boardId);
}

// Query 2:
// Get tasks by priority, newest first
function getTasksByPriority(priority) {
    return db
        .prepare(`
            SELECT
                id,
                column_id,
                title,
                description,
                priority,
                created_at
            FROM tasks
            WHERE priority = ?
            ORDER BY created_at DESC
        `)
        .all(priority);
}

module.exports = {
    getBoard,
    getTaskCountPerColumn,
    getTasksByPriority,
};