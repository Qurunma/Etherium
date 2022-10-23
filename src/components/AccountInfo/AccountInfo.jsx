import React from "react";
import { useSelector } from "react-redux";

function AccountInfo() {
  const accounts = useSelector((state) => state.accounts);
  const registeredAccounts = useSelector((state) => state.registeredAccounts);
  const selectedAccount = useSelector((state) => state.selectedAccount);
  const selectedBalance = useSelector((state) => state.selectedBalance);
  return registeredAccounts.map((element) => {
    if (accounts[selectedAccount] == element.user) {
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
      return (
        <div className="info-account">
          <h1 className="current-account">{element}</h1>
          <h2 className="account-balance">{selectedBalance / 10 ** 18}</h2>
          <h2 className="role-account">{role}</h2>
        </div>
      );
    }
  });
}
export default AccountInfo;
