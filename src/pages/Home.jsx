import React, { useContext } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../store/sortSlice";
import axios from "axios";

export default function Home() {
  const { searchValue } = useContext(SearchContext);
  const sortType = useSelector((state) => state.sort.sortType);
  const categoryId = useSelector((state) => state.sort.categoryId);

  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const search = searchValue ? `&title=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://65e58df6d7f0758a76e6aaad.mockapi.io/items?category=${
          categoryId === 0 ? "" : categoryId
        }&sortBy=${sortType.sortProperty}&order=${sortType.order}${search}
        `
      )
      .then((res) => setItem(res.data), setIsLoading(false));
  }, [categoryId, sortType, search]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickCategory={(i) => dispatch(setCategoryId(i))}
          categoryId={categoryId}
        />
        <Sort sortType={sortType} />
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
