import "./instructive.css";
import React, { useEffect, useRef } from "react";

const Instructive = () => {
  const imgRef = useRef(null);

  return (
    <div className="container-instructive">
      <img
        ref={imgRef}
        src="./assets/instructive/instructive.png"
        alt="instructive"
      />
    </div>
  );
};

export default Instructive;
