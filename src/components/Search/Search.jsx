import React, { useCallback, useContext, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

export default function Search() {
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };
  const updateSearchValue = useCallback(
    debounce((str) => setSearchValue(str), 500),
    []
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={(event) => onChangeInput(event)}
        placeholder="Поиск пиццы..."
      />
      <svg
        onClick={() => onClickClear()}
        height="512px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.closeIcon}
      >
        <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
      </svg>
    </div>
  );
}
