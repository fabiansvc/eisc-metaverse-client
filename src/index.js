import "./index.css";
import { StrictMode } from "react";
import Experience from "./Experience";
import { createRoot } from "react-dom/client";

/**
 * Entry point of the application where the root component is rendered into the DOM.
 * It uses ReactDOM.createRoot for concurrent rendering and wraps the app in StrictMode.
 */
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Experience />
  </StrictMode>
);
