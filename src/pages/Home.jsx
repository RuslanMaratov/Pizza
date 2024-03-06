import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";

export default function Home() {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://65e58df6d7f0758a76e6aaad.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setItem(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => {
              return <Skeleton key={index} />;
            })
          : item.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />;
            })}
      </div>
    </div>
  );
}
