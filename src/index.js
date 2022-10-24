import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import Web3 from "web3";
import { abi } from "./libs/abi.js";
import { Provider } from "react-redux";
import store from "./libs/Storage";
import { BrowserRouter } from "react-router-dom";

const contractAddress = "0xF1Cc281f71da57BB7a66556d00389449cff8D7c3";
const root = ReactDOM.createRoot(document.getElementById("root"));
 
export let web3, contract;

function network() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  contract = new web3.eth.Contract(abi, contractAddress);
}

network();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
