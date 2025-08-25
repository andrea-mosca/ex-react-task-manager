import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Errore nella richiesta:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TaskContext);
  return context;
}

export { TaskProvider, useTasks };
