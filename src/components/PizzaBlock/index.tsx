import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/cartSlice";
import { Link } from "react-router-dom";
import { PizzaBlockProps } from "../../redux/pizza/types";

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  imageUrl,
  types = [],
  sizes = [],
  price,
  count = 1,
}) => {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = useState(
    types.length === 1 ? types[0] : 0
  );
  const [activeSize, setActiveSize] = useState(
    sizes.length === 1 ? types[0] : 0
  );

  const onClickAdd = () => {
    const item = {
      id,
      imageUrl,
      title,
      price,
      type: [activeType],
      size: [activeSize],
      count,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typesId) => {
            return (
              <li
                key={typesId}
                onClick={() => setActiveType(typesId)}
                className={activeType === typesId ? "active" : ""}
              >
                {typesId === 0 ? "тонкое" : "традиционное"}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={index === activeSize ? "active" : ""}
              >
                {size} см
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price} ₽</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span onClick={onClickAdd}>Добавить</span>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock