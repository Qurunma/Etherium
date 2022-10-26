import React from "react";
import { useSelector } from "react-redux";

function SetShop() {
  const shops = useSelector((storage) => storage.shops);
  return (
    <select>
      {shops?.map((element, index) => {
        if (element.shop === "0x0000000000000000000000000000000000000000")
          return;
        console.log(element);
        return <option value={index}>{element.shop}</option>;
      })}
    </select>
  );
}

export default SetShop;
