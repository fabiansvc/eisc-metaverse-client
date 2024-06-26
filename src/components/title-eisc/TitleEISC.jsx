import "./styles-title-eisc.css";

import React from "react";

/**
 * Component that renders the title of the EISC Metaverse.
 */
const TitleEISC = () => {
  return (
    <div className="container-title-eisc">
      <img
        className="logo-univalle"
        src={"./assets/univalle/univalle.svg"}
        alt="Logo Univalle"
      />
      <span className="span-title">EISC Metaverse</span>
    </div>
  );
};

export default TitleEISC;