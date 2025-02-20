import React from "react";

import "./Like.scss";
import { FaHeart } from "react-icons/fa";

const Like = ({ onClick, count, style }) => {
  return (
    <div className="like" onClick={onClick}>
      {count > 0 && <span>{count}</span>}

      <FaHeart style={style} />
    </div>
  );
};

export default Like;
