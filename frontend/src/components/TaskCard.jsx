function TaskCard({
    task,
    columns,
    onEdit,
    onDelete,
    onMove,
}) {
    return (
        <div className="task-card">

            <h3>{task.title}</h3>

            {task.description && (
                <p>{task.description}</p>
            )}

            <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
            </span>

            <small>
                Created:{" "}
                {new Date(task.created_at).toLocaleDateString()}
            </small>

            <div className="task-actions">

                <button onClick={() => onEdit(task)}>
                    Edit
                </button>

                <button onClick={() => onDelete(task.id)}>
                    Delete
                </button>

            </div>

            <div className="move-section">

                <label>Move to:</label>

                <select
                    value={task.column_id}
                    onChange={(e) =>
                        onMove(
                            task.id,
                            Number(e.target.value)
                        )
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

            </div>

        </div>
    );
}

export default TaskCard;