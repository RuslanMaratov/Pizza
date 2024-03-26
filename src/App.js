import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import FullPizza from "./pages/FullPizza";

function App() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart scrollToTop={scrollToTop} />} />
          <Route
            path="*"
            element={<NotFoundPage scrollToTop={scrollToTop} />}
          />
          <Route path="/pizza/:id" element={<FullPizza />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
