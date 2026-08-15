import { useEffect, useState } from "react";

import {
    getBoard,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
} from "./services/api";

import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import EditTaskModal from "./components/EditTaskModal";

import "./App.css";

function App() {

    const [board, setBoard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingTask, setEditingTask] = useState(null);

    const [priorityFilter, setPriorityFilter] =
        useState("All");


    const loadBoard = async () => {
        try {

            setLoading(true);
            setError("");

            const data = await getBoard();

            setBoard(data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load tasks. Please make sure the backend is running."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadBoard();
    }, []);


    const handleCreate = async (task) => {

        try {

            await createTask(task);

            setShowForm(false);

            await loadBoard();

        } catch (err) {

            alert(
                err.response?.data?.error ||
                "Failed to create task"
            );

        }

    };


    const handleUpdate = async (id, task) => {

        try {

            await updateTask(id, task);

            setEditingTask(null);

            await loadBoard();

        } catch (err) {

            alert(
                err.response?.data?.error ||
                "Failed to update task"
            );

        }

    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteTask(id);

            await loadBoard();

        } catch (err) {

            alert(
                err.response?.data?.error ||
                "Failed to delete task"
            );

        }

    };


    const handleMove = async (
        taskId,
        columnId
    ) => {

        try {

            await moveTask(
                taskId,
                columnId
            );

            await loadBoard();

        } catch (err) {

            alert(
                err.response?.data?.error ||
                "Failed to move task"
            );

        }

    };


    if (loading) {
        return (
            <div className="message">
                Loading TaskFlow...
            </div>
        );
    }


    if (error) {
        return (
            <div className="message error">
                {error}

                <button onClick={loadBoard}>
                    Retry
                </button>
            </div>
        );
    }


    return (
        <div className="app">

            <header className="header">

                <div>
                    <h1>TaskFlow</h1>
                    <p>
                        Simple team task management
                    </p>
                </div>

                <button
                    className="add-button"
                    onClick={() =>
                        setShowForm(true)
                    }
                >
                    + Add Task
                </button>

            </header>


            <div className="toolbar">

                <label>
                    Filter by Priority:
                </label>

                <select
                    value={priorityFilter}
                    onChange={(e) =>
                        setPriorityFilter(
                            e.target.value
                        )
                    }
                >
                    <option value="All">
                        All
                    </option>

                    <option value="Low">
                        Low
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="High">
                        High
                    </option>
                </select>

            </div>


            <main className="board">

                {board.columns.map((column) => {

                    const filteredTasks =
                        priorityFilter === "All"
                            ? column.tasks
                            : column.tasks.filter(
                                (task) =>
                                    task.priority ===
                                    priorityFilter
                            );

                    return (
                        <Column
                            key={column.id}
                            column={{
                                ...column,
                                tasks: filteredTasks,
                            }}
                            columns={board.columns}
                            onEdit={setEditingTask}
                            onDelete={handleDelete}
                            onMove={handleMove}
                        />
                    );
                })}

            </main>


            {showForm && (
                <div className="modal-overlay">

                    <TaskForm
                        columns={board.columns}
                        onCreate={handleCreate}
                        onCancel={() =>
                            setShowForm(false)
                        }
                    />

                </div>
            )}


            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onSave={handleUpdate}
                    onCancel={() =>
                        setEditingTask(null)
                    }
                />
            )}

        </div>
    );
}

export default App;