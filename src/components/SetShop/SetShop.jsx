import React from "react";
import { useSelector } from "react-redux";

function SetShop() {
  const shops = useSelector((storage) => storage.shops);
  return (
    <select>
      {shops.map((element) => {
        console.log(element);
        return <option value={element.shop}>{element.shop}</option>;
      })}
    </select>
  );
}

export default SetShop;
