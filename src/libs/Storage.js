import { configureStore } from "@reduxjs/toolkit";

const defaultState = {
  accounts: [],
  selectedAccount: 0,
  registeredAccounts: [],
  selectedBalance: 0,
};

function reducer(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case "setAccounts":
      return { ...state, accounts: action.payload };
    case "setSelectedAccount":
      return { ...state, selectedAccount: action.payload };
    case "setRegisteredAccounts":
      return { ...state, registeredAccounts: action.payload };
    case "setSelectedBalance":
      return { ...state, selectedBalance: action.payload };
    default:
      return state;
  }
}

export default configureStore({
  reducer: reducer,
});
