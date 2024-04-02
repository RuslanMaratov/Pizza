import React, { memo } from "react";

type CategoriesProps = {
  onClickCategory: (i: number) => void, categoryId: number
}

const Categories: React.FC<CategoriesProps> = memo(({ onClickCategory, categoryId }) => {

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
)
export default Categories