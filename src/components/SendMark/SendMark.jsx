import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { contract } from "../..";

function SendMark() {
  const marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const accounts = useSelector((storage) => storage.accounts);
  const selectedAccount = useSelector((storage) => storage.selectedAccount);

  const id = useParams();
  console.log(useParams());

  const sender = async () => {
    try {
      if (!id.idMark) {
        const selected = document
          .querySelector(".mark-send")
          .querySelector("select").selectedOptions[0].textContent;
        console.log(
          await contract.methods
            .addMark(
              Number(id.idShop),
              Number(selected),
              document.querySelector(".mark-send").querySelector("input").value
            )
            .send({ from: accounts[selectedAccount], gas: 1000000 })
        );
      } else {
        console.log(
          await contract.methods
            .addComment(
              Number(id.idShop),
              Number(id.idMark),
              document.querySelector(".mark-send").querySelector("input").value
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
    <div className="mark-send">
      <h2>{!id.idMark ? "Оценить магазин" : "Оставить комментарий"}</h2>
      {!id.idMark ? (
        <select>
          {marks.map((element) => {
            return <option>{element}</option>;
          })}
        </select>
      ) : undefined}
      <input
        type="text"
        placeholder={!id.idMark ? "Введите отзыв" : "Введите текст комментария"}
      />
      <button onClick={sender}>
        {!id.idMark ? "Отправить оценку" : "Отправить комментарий"}
      </button>
    </div>
  );
}
export default SendMark;
