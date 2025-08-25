import { useTasks } from "../context/GlobalContext";

export default function TaskList() {
  const { tasks } = useTasks();
  console.log(tasks.data);
  return <div>Task LIST</div>;
}
