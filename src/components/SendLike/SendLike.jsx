import React from "react";
import { contract } from "../..";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function SendLike() {
  const accounts = useSelector((storage) => storage.accounts);
  const selectedAccount = useSelector((storage) => storage.selectedAccount);

  const id = useParams();

  const sendLike = async (e) => {
    try {
      if (!id.idMark) {
        console.log(
          await contract.methods
            .addLike(
              Number(id.idShop),
              Number(e.target.closest(".mark-element").dataset.id),
              e.target.textContent == "Лайк" ? true : false
            )
            .send({ from: accounts[selectedAccount], gas: 1000000 })
        );
      } else {
        console.log(
          await contract.methods
            .addLike(
              Number(id.idShop),
              Number(id.idMark),
              Number(e.target.closest(".mark-element").dataset.id),
              e.target.textContent == "Лайк" ? true : false
            )
            .send({ from: accounts[selectedAccount], gas: 1000000 })
        );
      }
      alert("Регистрация успешна!");
      sessionStorage.setItem("account", selectedAccount);
      window.location.reload();
    } catch (e) {
      console.log(e);
      if (e.message.includes("200")) alert("Вы не зарегистрированы!");
      else if (e.message.includes("100"))
        alert("На данный момент вы не являетесь админом!");
    }
  };
  return (
    <div>
      <button onClick={sendLike}>Лайк</button>
      <button onClick={sendLike}>Дизлайк</button>
    </div>
  );
}

export default SendLike;
