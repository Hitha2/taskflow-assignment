const request = require("supertest");

const express = require("express");
const cors = require("cors");

const db = require("../src/database/db");

const taskRoutes = require("../src/routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

describe("TaskFlow API", () => {

    test("creating a task without title should fail", async () => {

        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "",
                description: "Test",
                priority: "High",
                columnId: 1,
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.error)
            .toBe("Task title is required");
    });


    test("moving a task updates its column", async () => {

        const task = db
            .prepare(`
                SELECT id
                FROM tasks
                LIMIT 1
            `)
            .get();

        const column = db
            .prepare(`
                SELECT id
                FROM columns
                WHERE id != (
                    SELECT column_id
                    FROM tasks
                    WHERE id = ?
                )
                LIMIT 1
            `)
            .get(task.id);

        const response = await request(app)
            .patch(`/api/tasks/${task.id}/move`)
            .send({
                columnId: column.id,
            });

        expect(response.statusCode).toBe(200);

        const updatedTask = db
            .prepare(`
                SELECT column_id
                FROM tasks
                WHERE id = ?
            `)
            .get(task.id);

        expect(updatedTask.column_id)
            .toBe(column.id);
    });


    test("task count query returns correct rows", () => {

        const results = db
            .prepare(`
                SELECT
                    c.id,
                    c.name,
                    COUNT(t.id) AS task_count
                FROM columns c
                LEFT JOIN tasks t
                    ON t.column_id = c.id
                GROUP BY c.id, c.name
                ORDER BY c.position
            `)
            .all();

        expect(results.length).toBeGreaterThan(0);

        expect(results[0])
            .toHaveProperty("task_count");
    });

});