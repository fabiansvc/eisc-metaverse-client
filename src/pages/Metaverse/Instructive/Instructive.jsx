import "./stylesInstructive.css"
import React, { useEffect, useRef } from "react";

const Instructive = () => {
    const imgRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
          imgRef.current.style.display = "none";
        }, 3000);
    
        return () => clearTimeout(timer);
      }, []);
      
    return (
        <div className="Instructive">
            <img  ref={imgRef} src="./assets/instructive/instructive.jpg" alt="instructive" />
        </div>
    )
}

export default Instructive;
