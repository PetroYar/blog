import React from "react";

import "./Loyout.scss";
import Header from "../header/Header";

const Loyout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="loyout">
        <Header />
        <div className="loyout__container">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Loyout;
