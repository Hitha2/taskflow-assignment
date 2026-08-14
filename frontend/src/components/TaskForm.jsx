import { useState } from "react";

function TaskForm({
    columns,
    onCreate,
    onCancel,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [columnId, setColumnId] = useState(
        columns[0]?.id || ""
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Task title is required");
            return;
        }

        await onCreate({
            title,
            description,
            priority,
            columnId: Number(columnId),
        });

        setTitle("");
        setDescription("");
        setPriority("Medium");
    };

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
        >
            <h2>Create Task</h2>

            <label>Title *</label>

            <input
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                placeholder="Enter task title"
            />

            <label>Description</label>

            <textarea
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
                placeholder="Enter description"
            />

            <label>Priority</label>

            <select
                value={priority}
                onChange={(e) =>
                    setPriority(e.target.value)
                }
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <label>Column</label>

            <select
                value={columnId}
                onChange={(e) =>
                    setColumnId(e.target.value)
                }
            >
                {columns.map((column) => (
                    <option
                        key={column.id}
                        value={column.id}
                    >
                        {column.name}
                    </option>
                ))}
            </select>

            <div className="form-buttons">

                <button type="submit">
                    Create Task
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

            </div>
        </form>
    );
}

export default TaskForm;