import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  // Recupera le task al primo render
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasks`)
          .then((res) => res.json())
          .then((data) => setTasks(data));
      } catch (error) {
        console.error("Errore nella richiesta:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const { success, message, task } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) => [...prev, task]);
  };
  const removeTask = async (taskId) => {
    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };
  const updateTask = () => {};

  return { tasks, setTasks, addTask, removeTask, updateTask };
}
