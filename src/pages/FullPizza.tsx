import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{ imageUrl: string, price: number, title: string }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://65e58df6d7f0758a76e6aaad.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка";
  }

  return (
    <div>
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} alt="pizza" />
      <div className="pizza-block__price">{pizza.price} ₽</div>
    </div>
  );
};

export default FullPizza;
