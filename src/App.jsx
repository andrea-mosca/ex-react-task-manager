import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<TaskList />} />
          <Route path="add-task" element={<AddTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
