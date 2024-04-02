import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeSortType,
  setOpenSort,
} from "../redux/sort/sortSlice";
import {
  SortNameEnum, SortPropertyEnum,
  SortProps,
  SortType
} from "../redux/sort/types";
import { sortSelector } from "../redux/sort/selectors";


export const sortList: SortType[] = [
  { name: SortNameEnum.RATING, sortProperty: SortPropertyEnum.RATING, id: 0, order: "asc" },
  { name: SortNameEnum.PRICE_ASC, sortProperty: SortPropertyEnum.PRICE, id: 1, order: "asc" },
  { name: SortNameEnum.PRICE_DESC, sortProperty: SortPropertyEnum.PRICE, id: 2, order: "desc" },
  { name: SortNameEnum.TITLE, sortProperty: SortPropertyEnum.TITLE, id: 3, order: "asc" },
];

const Sort: React.FC<SortProps> = memo(({ value }) => {
  const { openSort } = useSelector(sortSelector);

  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        dispatch(setOpenSort(false));
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            dispatch(setOpenSort(null));
          }}
        >
          {value.name}
        </span>
      </div>
      {
        openSort && (
          <div className="sort__popup">
            <ul>
              {sortList.map((sortItem, index) => {
                return (
                  <li
                    onClick={() => dispatch(onChangeSortType(sortItem))}
                    key={index}
                    className={value.id === index ? "active" : ""}
                  >
                    {sortItem.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )
      }
    </div >
  );
})

export default Sort