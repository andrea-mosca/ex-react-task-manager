import React from "react";
import { Link } from "react-router-dom";

// React.memo evita il re-render se le props non cambiano
const TaskRow = React.memo(({ task }) => {
  let cellColor;
  if (task.status === "To do") {
    cellColor = "table-danger";
  } else if (task.status === "Doing") {
    cellColor = "table-warning";
  } else {
    cellColor = "table-success";
  }
  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </td>
      <td className={cellColor}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
