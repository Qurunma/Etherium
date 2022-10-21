import React from "react";
import { useSelector } from "react-redux";
import { registration } from "../../libs/registration.js";

function AccountInfo() {
  const accounts = useSelector((state) => state.accounts);
  const selectedAccount = useSelector((state) => state.selectedAccount);
  const registeredAccounts = useSelector((state) => state.registeredAccounts);
  const selectedBalance = useSelector((state) => state.selectedBalance);

  let isReady = false;

  return registeredAccounts?.map((element) => {
    let role;
    switch (Number(element.nowRole)) {
      case 0:
        role = "Администратор";
        break;
      case 1:
        role = "Продавец";
        break;
      case 2:
        role = "Покупатель";
        break;
    }
    isReady = true;
    return (
      <div className="info-account">
        <h1 className="current-account">{element.user}</h1>
        <h2 className="account-balance">{selectedBalance / 10 ** 18}</h2>
        <h2 className="role-account">{role}</h2>
      </div>
    );
  });
}
export default AccountInfo;
