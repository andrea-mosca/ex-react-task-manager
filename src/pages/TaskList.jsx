import { useTaskContext } from "../context/GlobalContext";
import TaskRow from "../component/TaskRow";
import { useState, useMemo, useCallback } from "react";

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const { tasks } = useTaskContext();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchSetQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );
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
    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let comparison;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          const statusOption = ["To do", "Doing", "Done"];
          const indexA = statusOption.indexOf(a.status);
          const indexB = statusOption.indexOf(b.status);
          comparison = indexA - indexB;
        } else if (sortBy === "createdAt") {
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }

        return comparison * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  return (
    <div className="container">
      <h1>Tasks Lists</h1>
      <div>
        <input
          onChange={(e) => debouncedSearchSetQuery(e.target.value)}
          placeholder="Cerca una Task..."
          className="mt-4"
        ></input>
      </div>
      <div className="mt-1">
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
            {sortedTasks.length === 0 ? (
              <tr>
                <td>nessuna Task trovata</td>
              </tr>
            ) : (
              sortedTasks.map((t) => <TaskRow key={t.id} task={t} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
