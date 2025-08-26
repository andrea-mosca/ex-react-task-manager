import { createContext, useContext } from "react";
import useTasks from "../hooks/UseTasks";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const taskData = useTasks();

  return (
    <TaskContext.Provider value={{ ...taskData }}>
      {children}
    </TaskContext.Provider>
  );
}

function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext deve essere usato dentro TaskProvider");
  }
  return context;
}

export { TaskProvider, useTaskContext };
