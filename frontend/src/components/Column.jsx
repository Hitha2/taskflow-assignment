import TaskCard from "./TaskCard";

function Column({
    column,
    columns,
    onEdit,
    onDelete,
    onMove,
}) {
    return (
        <div className="column">

            <h2>
                {column.name}
                <span className="count">
                    {column.tasks.length}
                </span>
            </h2>

            {column.tasks.length === 0 ? (
                <p className="empty">
                    No tasks
                </p>
            ) : (
                column.tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        columns={columns}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onMove={onMove}
                    />
                ))
            )}

        </div>
    );
}

export default Column;