import { useParams } from "react-router-dom";
import useTasks from "../hooks/UseTasks";

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks } = useTasks();
  const task = tasks.find((t) => String(t.id) === id);

  if (!task) {
    // Mentre le task sono vuote o non è stata trovata la task
    return (
      <p className="container mt-3">Caricamento task o task non trovata...</p>
    );
  }

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="card-title">{task.title}</h5>
          <p className="card-text">
            <strong>description: </strong>
            {task.description}
          </p>
          <div>
            <strong>status: </strong>
            {task.status}
          </div>
          <div>
            {" "}
            <strong>created at:</strong>{" "}
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
          <button
            onClick={() => console.log("task eliminata")}
            className="btn btn-danger"
          >
            Elimina Task
          </button>
        </div>
      </div>
    </div>
  );
}
