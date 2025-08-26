import { useState, useRef, useMemo } from "react";
import { useTaskContext } from "../context/GlobalContext";

const symbols = `!@#$%^&\*()-\_=+[]{}|;:'\\",.<>?/~`;

export default function AddTask() {
  const { addTask } = useTaskContext();

  const [title, setTitle] = useState("");
  const descriptionRef = useRef("");
  const statusRef = useRef("To Do");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };
    try {
      await addTask(newTask);
      alert("Task creata con successo");
    } catch (err) {
      alert(err.message);
    }

    setTitle("");
    descriptionRef.current.value = "";
    statusRef.current.value = "To Do";
  };

  const isTitleValid = useMemo(() => {
    return title.split(``).some((char) => symbols.includes(char));
  }, [title]);

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Name
            </label>
            <input
              name="title"
              id="title"
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {title.trim() && (
              <p style={{ color: isTitleValid ? "red" : null }}>
                {isTitleValid ? "non inserire caratteri speciali" : null}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="description">
              {" "}
              description
            </label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              ref={descriptionRef}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="status">
              status
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              ref={statusRef}
              defaultValue="To do"
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isTitleValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
