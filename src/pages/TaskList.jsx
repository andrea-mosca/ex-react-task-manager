import { useTasks } from "../context/GlobalContext";
import TaskRow from "./component/TaskRow";

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Stato</th>
            <th scope="col">Data di Creazione</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
