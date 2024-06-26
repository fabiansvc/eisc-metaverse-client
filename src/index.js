import "./styles-index.css";
import Experience from "./Experience";
import { createRoot } from "react-dom/client";

/**
 * Entry point of the application where the root component is rendered into the DOM.
 * It uses ReactDOM.createRoot for concurrent rendering.
 */
createRoot(document.getElementById("root")).render(<Experience />);
