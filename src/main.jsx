import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// *IMPORT CSS
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// my CSS
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
