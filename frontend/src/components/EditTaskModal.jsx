import { useState } from "react";

function EditTaskModal({
    task,
    onSave,
    onCancel,
}) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] =
        useState(task.description || "");
    const [priority, setPriority] =
        useState(task.priority);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Task title is required");
            return;
        }

        await onSave(task.id, {
            title,
            description,
            priority,
        });
    };

    return (
        <div className="modal-overlay">

            <form
                className="task-form modal"
                onSubmit={handleSubmit}
            >
                <h2>Edit Task</h2>

                <label>Title *</label>

                <input
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <label>Description</label>

                <textarea
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
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

                <div className="form-buttons">

                    <button type="submit">
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </div>
            </form>

        </div>
    );
}

export default EditTaskModal;