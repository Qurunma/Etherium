import React from "react";
import { useSelector } from "react-redux";
import { contract } from "../..";

function AddAdmin() {
  const accounts = useSelector((storage) => storage.registeredAccounts);
  const currentAccount = useSelector((storage) => storage.selectedAccount);

  const upper = (e) => {
    try {
      const selected = document
        .querySelector(".admin-panel")
        .querySelector("select").selectedOptions[0].textContent;
      accounts.forEach(async (element) => {
        if (element.user === selected) {
          console.log(
            await contract.methods
              .addAdmin(element.user)
              .send({ from: accounts[currentAccount].user, gas: 1000000 })
          );
          alert("Регистрация успешна!");
          sessionStorage.setItem("account", currentAccount);
          window.location.reload();
        }
      });
    } catch (e) {
      console.log(e);
      if (e.message.includes("201")) alert("Вы уже зарегистрированы!");
    }
  };

  return (
    <div className="admin-panel">
      <select>
        {accounts.map((element) => {
          if (Number(element.role) === 0) return;
          return <option value={element.user}>{element.user}</option>;
        })}
      </select>
      <button onClick={upper}>Повысить до администратора</button>
    </div>
  );
}
export default AddAdmin;
