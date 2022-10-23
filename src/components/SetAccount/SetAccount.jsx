import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { contract, web3 } from "../..";

function SetAccount() {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts);
  const selectedAccount = useSelector((state) => state.selectedAccount);

  const localSelectedAccount = localStorage.getItem("account") || 0;
  console.log(localSelectedAccount);
  localStorage.clear();

  if (localSelectedAccount != 0) {
    dispatch({ type: "setSelectedAccount", payload: localSelectedAccount });
  }

  if (accounts.length !== 100) {
    get();
  }

  async function get() {
    const localAllAcc = await web3.eth.getAccounts().then((data) => data);
    let balance;
    const localRegisteredAcc = await contract.methods
      .view_Users()
      .call()
      .then((data) => data);
    if (selectedAccount != undefined) {
      balance = await web3.eth
        .getBalance(localAllAcc[selectedAccount])
        .then((data) => data);
    }
    if (localAllAcc.length !== 0) {
      dispatch({ type: "setAccounts", payload: localAllAcc });
    }
    if (localRegisteredAcc.length !== 0) {
      dispatch({ type: "setRegisteredAccounts", payload: localRegisteredAcc });
    }
    if (balance !== 0) {
      dispatch({ type: "setSelectedBalance", payload: balance });
    }
  }
  return (
    <select
      className="set-acc"
      onChange={(e) => {
        dispatch({
          type: "setSelectedAccount",
          payload: e.target.selectedIndex,
        });
        localStorage.setItem("account", e.target.selectedIndex);
      }}
    >
      {accounts.map((element, index) => {
        console.log(index);
        console.log(Number(localSelectedAccount));
        console.log(index == Number(localSelectedAccount));
        if (
          index == Number(localSelectedAccount) &&
          localSelectedAccount != 0
        ) {
          return (
            <option value={element} key={index} selected>
              {element}
            </option>
          );
        }
        return (
          <option value={element} key={index}>
            {element}
          </option>
        );
      })}
    </select>
  );
}
export default SetAccount;
