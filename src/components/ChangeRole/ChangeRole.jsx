import React from "react";
import { useSelector } from "react-redux";
import { contract } from "../..";

function ChangeRole() {
  const shops = useSelector((storage) => storage.shops);
  const accounts = useSelector((storage) => storage.registeredAccounts);
  const currentAccount = useSelector((storage) => storage.selectedAccount);
  const requestsSellers = useSelector((storage) => storage.requestsSellers);
  const requestsUsers = useSelector((storage) => storage.requestsUsers);

  const changer = async (e) => {
    try {
      const answer = e.target.textContent;
      const div = e.target.closest(".sellers");
      if (div !== null) {
        if (answer == "Принять")
          console.log(
            await contract.methods
              .downToUser(e.target.closest("div").dataset.id)
              .send({ from: accounts[currentAccount].user, gas: 1000000 })
          );
      } else {
        if (answer == "Принять")
          console.log(
            await contract.methods
              .upToSeller(e.target.closest("div").dataset.id)
              .send({ from: accounts[currentAccount].user, gas: 1000000 })
          );
      }
      // alert("Регистрация успешна!");
      // sessionStorage.setItem("account", currentAccount);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      if (e.message.includes("200")) alert("Вы не зарегистрированы!");
      else if (e.message.includes("100"))
        alert("На данный момент вы не являетесь админом!");
    }
  };

  return (
    <div className="admin-panel">
      <div className="sellers">
        <h2>Заявки продавцов на понижение</h2>
        {requestsSellers.map((element, index) => {
          if (element.status) return;
          return (
            <div data-id={index}>
              <span>Пользователь: {accounts[element.idRequester]}</span>
              <br></br>
              <button onClick={changer}>Принять</button>
              <button onClick={changer}>Отказать</button>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Заявки покупателей на повышение</h2>
        {requestsUsers.map((element, index) => {
          if (element.status) return;
          console.log(element);
          return (
            <div data-id={index}>
              <span>Пользователь: {accounts[element.idRequester]}</span>
              <br></br>
              <span>Желаемый магазин: {shops[element.idShop].shop}</span>
              <br></br>
              <button onClick={changer}>Принять</button>
              <button onClick={changer}>Отказать</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ChangeRole;
