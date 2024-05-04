import React from "react";
import ReactDOM from "react-dom";
import Experience from "./Experience";
import "./index.css";

/**
 * Entry point of the application where the root component is rendered into the DOM.
 * It uses ReactDOM.createRoot for concurrent rendering and wraps the app in StrictMode.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Experience />
  </React.StrictMode>
);
