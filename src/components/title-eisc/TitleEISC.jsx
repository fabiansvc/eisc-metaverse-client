/**
 * @fileOverview This file contains the TitleEISC component, which displays the title of the EISC Metaverse along with the Univalle logo.
 */

import React from "react";
import "./styles-title-eisc.css";

/**
 * TitleEISC component.
 * Renders the title of the EISC Metaverse along with the Univalle logo.
 * 
 * @returns {JSX.Element} The JSX.Element containing the title and logo.
 */
export default function TitleEISC () {
  return (
    <div className="container-title-eisc">
      <img
        className="logo-univalle"
        src={"./assets/univalle/univalle.svg"}
        alt="Logo Universidad del Valle"
      />
      <span className="span-title">EISC Metaverse</span>
    </div>
  );
};