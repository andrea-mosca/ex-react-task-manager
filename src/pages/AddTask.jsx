import { useState, useRef, useMemo } from "react";
const symbols = `!@#$%^&\*()-\_=+[]{}|;:'\\",.<>?/~`;
export default function AddTask() {
  const [title, setTitle] = useState("");
  const descriptionRef = useRef("");
  const statusRef = useRef("To Do");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`
      "title":${title},
      "descrizione":${descriptionRef.current.value},
      status:${statusRef.current.value}
   `);
    setTitle("");
    descriptionRef.current.value = "";
    statusRef.current.value = "To Do";
  };

  const isTitleValid = useMemo(() => {
    return title.split(``).some((char) => symbols.includes(char));
  }, [title]);
  console.log(isTitleValid);

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
              defaultValue={"To Do"}
            >
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
