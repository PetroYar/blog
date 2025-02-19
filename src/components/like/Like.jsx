import React from "react";

import "./Like.scss";
import { FaHeart } from "react-icons/fa";

const Like = ({ onClick, count }) => {
  return (
    <div className="like" onClick={onClick}>
      {count>0 && <span>{count}</span> }
      
      <FaHeart  />
    </div>
  );
};

export default Like;
