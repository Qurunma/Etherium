import React from "react";
import { useSelector } from "react-redux";
import SetAccount from "../../components/SetAccount";
import AccountInfo from "../../components/AccountInfo";
import SwitchRole from "../../components/SwitchRole";
import Register from "../../components/Register";
import ListShops from "../../components/ListShops";
import { Link } from "react-router-dom";

function MainPage() {
  const accounts = useSelector((store) => store.accounts);
  const selectedAccount = useSelector((store) => store.selectedAccount);
  const registeredAccounts = useSelector((store) => store.registeredAccounts);
  let isExists = false;
  let isAdmin = false;

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
          element.role < 2 &&
          element.user == accounts[selectedAccount]
        ) {
          isExists = true;
          return (
            <div>
              <AccountInfo></AccountInfo>
              <SwitchRole></SwitchRole>
            </div>
          );
        } else if (element.user == accounts[selectedAccount]) {
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
    </div>
  );
}

export default MainPage;
