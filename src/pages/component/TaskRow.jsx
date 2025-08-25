import React from "react";

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
      <th scope="row">{task.id}</th>
      <td>{task.title}</td>
      <td className={cellColor}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
