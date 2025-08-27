import { useParams, useNavigate } from "react-router-dom";
import useTasks from "../hooks/UseTasks";
import { useTaskContext } from "../context/GlobalContext";
import Modal from "../component/Modal";
import { useState } from "react";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, removeTask } = useTaskContext();
  const task = tasks.find((t) => String(t.id) === id);

  const [showModal, setShowModal] = useState(false);
  if (!task) {
    // Mentre le task sono vuote o non è stata trovata la task
    return (
      <h1 className="container mt-3">Caricamento task o task non trovata...</h1>
    );
  }
  const handleButtonClick = async () => {
    try {
      await removeTask(task.id);
      alert("task eliminata con successo");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
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
            type="button"
            onClick={() => setShowModal(true)}
            className="btn btn-danger"
          >
            Elimina Task
          </button>
          <Modal
            title={task.title}
            content={"Sei sicuro di voler eliminare la Task?"}
            onConfirm={handleButtonClick}
            onClose={() => setShowModal(false)}
            show={showModal}
          />
        </div>
      </div>
    </div>
  );
}
