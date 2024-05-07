import "./instructive.css";
import React, { useRef } from "react";

/**
 * Component for displaying an instructive image.
 * @returns {JSX.Element} The JSX.Element containing the instructive image.
 */
const Instructive = ({ isLoading = false }) => {
  const imgRef = useRef(null);

  return (
    <div className="container-instructive">
      {/* Renders the instructive image */}
      <img
        ref={imgRef}
        src="./assets/instructive/instructive.png"
        alt="instructive"
      />
      {isLoading && <span> Cargando... </span>}
    </div>
  );
};

export default Instructive;
