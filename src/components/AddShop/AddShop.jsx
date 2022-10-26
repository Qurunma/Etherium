import React from "react";
import { useSelector } from "react-redux";
import { contract } from "../..";

function AddShop() {
  const accounts = useSelector((storage) => storage.accounts);
  const registeredAccounts = useSelector(
    (storage) => storage.registeredAccounts
  );
  const currentAccount = useSelector((storage) => storage.selectedAccount);

  const addShop = async () => {
    try {
      const selected = document
        .querySelector(".admin-panel")
        .querySelector("select").selectedOptions[0].textContent;
      const city = document
        .querySelector(".admin-panel")
        .querySelector("input").value;
      console.log(city);
      if (city.trim() === "") {
        throw new Error("700");
      }
      console.log(
        await contract.methods
          .addShop(selected, city)
          .send({ from: accounts[currentAccount], gas: 1000000 })
      );
      alert("Регистрация успешна!");
      sessionStorage.setItem("account", currentAccount);
      window.location.reload();
    } catch (e) {
      console.log(e);
      document.querySelector(".error-city").style.display = "none";
      if (e.message.includes("200")) alert("Вы не зарегистрированы!");
      else if (e.message.includes("100"))
        alert("На данный момент вы не являетесь админом!");
      else if (e.message.includes("700"))
        document.querySelector(".error-city").style.display = "block";
    }
  };

  return (
    <div className="admin-panel">
      <select>
        {accounts.map((element) => {
          const isReg = registeredAccounts.map((elem) => {
            if (element === elem.user) return true;
          });
          console.log(isReg);
          if (isReg.includes(true)) return;
          return <option value={element}>{element}</option>;
        })}
      </select>
      <span className="error-city" style={{ display: "none" }}>
        Введите город
      </span>
      <input type="text" placeholder="Введите город" />
      <button onClick={addShop}>Создать магазин</button>
    </div>
  );
}
export default AddShop;
