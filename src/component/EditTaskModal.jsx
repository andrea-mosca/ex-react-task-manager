import { useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);
  const editFormRef = useRef();

  const changeEditedTask = (key, event) => {
    setEditedTask((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <div>
            <label className="form-label">
              Nome Task:
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => changeEditedTask(`title`, e)}
                className="form-control"
              />
            </label>
          </div>
          <div>
            <label className="form-label">
              Descrizione:{" "}
              <textarea
                value={editedTask.description}
                onChange={(e) => changeEditedTask(`description`, e)}
                className="form-control"
              />
            </label>
          </div>
          <div>
            <label className="form-label">
              Stato:{" "}
              <select
                value={editedTask.status}
                onChange={(e) => changeEditedTask(`status`, e)}
                className="form-select"
              >
                {["To do", "Doing", "Done"].map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
}
