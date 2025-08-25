import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  // Recupera le task al primo render
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

  // Funzioni vuote per ora
  const addTask = () => {};
  const removeTask = () => {};
  const updateTask = () => {};

  return { tasks, setTasks, addTask, removeTask, updateTask };
}
