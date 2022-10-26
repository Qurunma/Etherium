import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ShopElement() {
  const shops = useSelector((storage) => storage.shops);
  return shops?.map((element, index) => {
    console.log(element);
    return (
      <div className="shop-element">
        <span>Адрес магазина: {element.shop}</span>
        <br></br>
        <span>Количество оценок: {element.bookOfMarks.length}</span>
        <Link to={"/shops/" + index}>
          <button>Открыть оценки магазина</button>
        </Link>
      </div>
    );
  });
}
export default ShopElement;
