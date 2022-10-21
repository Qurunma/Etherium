import "./App.css";
import SetAccount from "../components/SetAccount";
import AccountInfo from "../components/AccountInfo";
import { useSelector } from "react-redux";

function App() {
  const accounts = useSelector((store) => store.accounts);
  const selectedAccount = useSelector((store) => store.selectedAccount);
  const registeredAccounts = useSelector((store) => store.registeredAccounts);
  return (
    <div className="App">
      <SetAccount></SetAccount>
      {registeredAccounts.map((element) => {
        if (element.user == accounts[selectedAccount]) {
          console.log(element.user == accounts[selectedAccount]);
          return <AccountInfo></AccountInfo>;
        }
      })}
    </div>
  );
}

export default App;
