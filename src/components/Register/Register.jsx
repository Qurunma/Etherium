import React from "react";
import { useSelector } from "react-redux";
import { contract } from "../..";

function Register() {
  const accounts = useSelector((store) => store.accounts);
  const currentAccount = useSelector((storage) => storage.selectedAccount);

  const register = async () => {
    try {
      console.log(
        await contract.methods
          .regUser()
          .send({ from: accounts[currentAccount], gas: 1000000 })
      );
      alert("Регистрация успешна!");
      sessionStorage.setItem("account", currentAccount);
      window.location.reload();
    } catch (e) {
      if (e.message.includes("201")) alert("Вы уже зарегистрированы!");
    }
  };
  return <button onClick={register}>Зарегистрироваться</button>;
}
export default Register;
