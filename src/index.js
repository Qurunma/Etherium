import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { BrowserRouter as Router } from "react-router-dom";
import Web3 from "web3";
import { abi } from "./libs/abi.js";

const contractAddress = "0x52bacf4B84080834A35A6077693eB9721A089581";
const root = ReactDOM.createRoot(document.getElementById("root"));

export let web3, contract;

function network() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  contract = new web3.eth.Contract(abi, contractAddress);
}

network();

// React.useEffect(() => {}, []);

root.render(
  <Router>
    <App />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
