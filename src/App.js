import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import React, { createContext, useState } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CartEmpty from "./pages/CartEmpty";
import NotFoundPage from "./pages/NotFoundPage";

export const SearchContext = createContext();

function App() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart scrollToTop={scrollToTop} />} />
            <Route
              path="*"
              element={<NotFoundPage scrollToTop={scrollToTop} />}
            />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
