import React from "react";
import { useSelector } from "react-redux";
import MarkElement from "./MarkElement";

function ShopElement() {
  const Shops = useSelector((storage) => storage.Shops);
  return (
    <div>
      {Shops?.forEach((element) => {
        <MarkElement element={element}></MarkElement>;
      })}
    </div>
  );
}
export default ShopElement;
