import React from "react";
import emptyCartImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

export default function CartEmpty({ scrollToTop }) {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyCartImg} alt="Empty cart" />
        <Link to="/" className="button button--black" onClick={scrollToTop}>
          <span>Выбрать пиццы</span>
        </Link>
      </div>
    </div>
  );
}
