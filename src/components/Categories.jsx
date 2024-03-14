import React from "react";

export default function Categories({ onClickCategory, categoryId }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                onClickCategory(index);
              }}
              className={categoryId === index ? "active" : ""}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
