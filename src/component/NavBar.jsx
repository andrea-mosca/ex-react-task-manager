import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar bg-primary border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="d-flex gap-5 px-5 py-2">
        <NavLink to="/">Tasks List</NavLink>
        <NavLink to="/add">Add Task</NavLink>
      </div>
    </nav>
  );
}
