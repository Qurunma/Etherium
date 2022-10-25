import React from "react";
import { useSelector } from "react-redux";
import SetAccount from "../../components/SetAccount";
import AccountInfo from "../../components/AccountInfo";
import SwitchRole from "../../components/SwitchRole";
import Register from "../../components/Register";
import ListShops from "../../components/ListShops";
import { Link } from "react-router-dom";
import SetShop from "../SetShop";
import { contract } from "../..";

function MainPage() {
  const accounts = useSelector((store) => store.accounts);
  const selectedAccount = useSelector((store) => store.selectedAccount);
  const registeredAccounts = useSelector((store) => store.registeredAccounts);
  let isExists = false;
  let isAdmin = false;
  let isSeller = false;
  let isSimpleUser = false;

  const createRequest = async () => {
    //запрет повоторного запроса
    try {
      const selected = document
        .querySelector(".create-request")
        .querySelector("select")?.selectedIndex;
      if (selected !== undefined)
        console.log(
          await contract.methods
            .globalSwitchRequest(selected)
            .send({ from: accounts[selectedAccount], gas: 1000000 })
        );
      else {
        console.log(
          await contract.methods
            .globalSwitchRequest()
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
      <SetAccount></SetAccount>
      {registeredAccounts.map((element) => {
        if (element.nowRole == 0 && element.user == accounts[selectedAccount]) {
          isAdmin = true;
          isExists = true;
          return (
            <div>
              <AccountInfo></AccountInfo>
              <SwitchRole></SwitchRole>
            </div>
          );
        } else if (
          element.role == 1 &&
          element.user == accounts[selectedAccount]
        ) {
          isSeller = true;
          isExists = true;
          return (
            <div>
              <AccountInfo></AccountInfo>
              <SwitchRole></SwitchRole>
            </div>
          );
        } else if (element.user == accounts[selectedAccount]) {
          isSimpleUser = true;
          isExists = true;
          return <AccountInfo></AccountInfo>;
        }
      })}
      {!isExists ? (
        <div>
          <Register></Register>
        </div>
      ) : undefined}
      {isAdmin ? (
        <div className="open-admin-panel">
          <Link to="/admin">
            <button>Открыть панель адмнистратора</button>
          </Link>
        </div>
      ) : undefined}
      {isSeller ? (
        <div className="create-request">
          <button onClick={createRequest}>Создать заявку на понижение</button>
        </div>
      ) : undefined}
      {isSimpleUser ? (
        <div className="create-request">
          <SetShop></SetShop>
          <button onClick={createRequest}>Создать заявку на повышение</button>
        </div>
      ) : undefined}
    </div>
  );
}

export default MainPage;
