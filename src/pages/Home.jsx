import React from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import styles from "../components/NotFoundBlock/NotFoundBlock.module.scss";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { setCategoryId, setFilters, sortSelector } from "../store/sortSlice";
import { fetchPizzas, pizzasSelector } from "../store/pizzasSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { searchValue } = useSelector(sortSelector);
  const { sortType } = useSelector(sortSelector);
  const { categoryId } = useSelector(sortSelector);
  const { item } = useSelector(pizzasSelector);
  const { status } = useSelector(pizzasSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const search = searchValue ? `&title=${searchValue}` : "";

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoryId, sortType, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const searchString = window.location.search.slice(1);
      const params = qs.parse(searchString);
      const sort = sortList.find(
        (obj) =>
          obj.sortProperty === params.sortProperty && obj.order === params.order
      );
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, search]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: categoryId,
        sortProperty: sortType.sortProperty,
        order: sortType.order,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType]);

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

      {status === "error" ? (
        <div className={styles.root}>
          <h1>
            <span>😕</span>
            <br />
            Ничего не найдено
          </h1>
          <p className={styles.description}>К сожалению произошла ошибка!</p>
        </div>
      ) : status === "loading" ? (
        <div className="content__items">
          {[...new Array(6)].map((_, index) => {
            return <Skeleton key={index} />;
          })}
        </div>
      ) : (
        <div className="content__items">
          {item.map((obj) => {
            return <PizzaBlock key={obj.id} {...obj} />;
          })}
        </div>
      )}
    </div>
  );
}
