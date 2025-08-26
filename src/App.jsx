import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import { TaskProvider } from "./context/GlobalContext";
import TaskDetails from "./pages/TaskDetails";

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<TaskList />} />
            <Route path="add" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}
