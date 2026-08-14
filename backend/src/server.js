const express = require("express");
const cors = require("cors");

require("./database/db");

const taskRoutes = require("./routes/taskRoutes");
const boardRoutes = require("./routes/boardRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

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
    console.log(`TaskFlow backend running on port ${PORT}`);
});