import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import { TaskProvider } from "./context/GlobalContext";

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<TaskList />} />
            <Route path="add-task" element={<AddTask />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}
