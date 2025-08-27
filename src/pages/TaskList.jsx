import { useTaskContext } from "../context/GlobalContext";
import TaskRow from "../component/TaskRow";
import { useState, useMemo } from "react";

export default function TaskList() {
  const { tasks } = useTaskContext();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const sortIcon = sortOrder === 1 ? "⇩" : "⇧";
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => -prev);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    const orderMap = { "To do": 1, Doing: 2, Done: 3 };

    return [...tasks].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        comparison = orderMap[a.status] - orderMap[b.status];
      } else if (sortBy === "createdAt") {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);
  return (
    <div className="container">
      <h1>Tasks Lists</h1>
      <div className="mt-5">
        <table className="table border border-black p-2 mb-2 border-opacity-50">
          <thead>
            <tr>
              <th
                className="my-order border border-black text-bg-primary"
                scope="col"
                onClick={() => handleSort("title")}
              >
                Nome {sortBy === "title" && sortIcon}
              </th>
              <th
                className="my-order border border-black text-bg-primary"
                scope="col"
                onClick={() => handleSort("status")}
              >
                Stato {sortBy === "status" && sortIcon}
              </th>
              <th
                className="my-order border border-black text-bg-primary"
                scope="col"
                onClick={() => handleSort("createdAt")}
              >
                Data di Creazione {sortBy === "createdAt" && sortIcon}
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {sortedTasks.map((t) => (
              <TaskRow key={t.id} task={t} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
