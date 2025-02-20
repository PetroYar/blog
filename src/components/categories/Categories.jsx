import React, { useEffect, useState } from "react";

import "./Categories.scss";
import { getData } from "../../../libs/services";

const Categories = (props) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    try {
      getData("/categories").then((res) => {
        setCategories(res);
      });
    } catch (error) {}
  }, []);

  return (
    <div className="categories">
      {categories && (
        <select >
          {categories.map((category) => {
            return (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default Categories;
