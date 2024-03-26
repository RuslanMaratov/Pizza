import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import FullPizza from "./pages/FullPizza";
import Layout from "./components/Layout";

function App() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart scrollToTop={scrollToTop} />} />
        <Route path="*" element={<NotFoundPage scrollToTop={scrollToTop} />} />
        <Route path="pizza/:id" element={<FullPizza />} />
      </Route>
    </Routes>
  );
}

export default App;
