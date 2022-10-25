import React from "react";
import { useSelector } from "react-redux";
import { contract } from "../..";
import SetShop from "../SetShop";

function DeleteShop() {
  const accounts = useSelector((storage) => storage.accounts);
  const currentAccount = useSelector((storage) => storage.selectedAccount);

  const deleter = async () => {
    try {
      const selected = document
        .querySelector(".admin-panel")
        .querySelector("select").selectedIndex;
      console.log(
        await contract.methods
          .deleteShop(selected)
          .send({ from: accounts[currentAccount], gas: 1000000 })
      );
      alert("Регистрация успешна!");
      sessionStorage.setItem("account", currentAccount);
      window.location.reload();
    } catch (e) {
      console.log(e);
      if (e.message.includes("200")) alert("Вы не зарегистрированы!");
      else if (e.message.includes("100"))
        alert("На данный момент вы не являетесь админом!");
    }
  };

  return (
    <div className="admin-panel">
      <SetShop></SetShop>
      <button onClick={deleter}>Удалить магазин</button>
    </div>
  );
}
export default DeleteShop;
