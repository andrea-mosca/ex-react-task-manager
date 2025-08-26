import { Outlet } from "react-router-dom";
import Navbar from "../component/NavBar";
export default function DefaultLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
