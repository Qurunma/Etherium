import React from "react";
import { contract, web3 } from "../..";

function SetAccount(params) {
  const [accounts, setAccounts] = React.useState(1);

  console.log(typeof accounts);

  if (typeof accounts === "number") {
    get();
  }

  async function get() {
    const localAcc = await web3.eth.getAccounts().then((data) => data);
    console.log(localAcc);
    setAccounts(localAcc);
  }

  return (
    <select className="set-acc">
      {accounts.foreach((element) => {
        <option value={element}>{element}</option>;
      })}
    </select>
  );
}
export default SetAccount;
