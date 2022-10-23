import React from "react";
import { useSelector } from "react-redux";
import { contract } from "../..";

function SwitchRole() {
  const registeredAccounts = useSelector((store) => store.registeredAccounts);
  const currentAccount = useSelector((storage) => storage.selectedAccount);

  const switcher = async () => {
    try {
      console.log(
        await contract.methods
          .switchToUser()
          .send({ from: registeredAccounts[currentAccount].user })
      );
      localStorage.setItem("account", currentAccount);
      window.location.reload();
    } catch (e) {
      if (e.message.includes("103")) alert("Вы не можете изменять свою роль");
    }
  };
  return <button onClick={switcher}>Сменить роль</button>;
}
export default SwitchRole;
