import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  console.log(pizza);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://65e58df6d7f0758a76e6aaad.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
      }
    }
    fetchPizza();
  }, []);

  return (
    <div>
      <img src={pizza.imageUrl} alt="pizza" />
      <div className="pizza-block__price">{pizza.price} ₽</div>
    </div>
  );
};

export default FullPizza;
