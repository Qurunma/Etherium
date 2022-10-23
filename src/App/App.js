import "./App.css";
import SetAccount from "../components/SetAccount";
import AccountInfo from "../components/AccountInfo";
import { useSelector } from "react-redux";
import SwitchRole from "../components/SwitchRole";
import Register from "../components/Register";

function App() {
  const accounts = useSelector((store) => store.accounts);
  const selectedAccount = useSelector((store) => store.selectedAccount);
  const registeredAccounts = useSelector((store) => store.registeredAccounts);

  let isExists = false;
  return (
    <div className="App">
      <SetAccount></SetAccount>
      {registeredAccounts.map((element) => {
        if (element.role < 2 && element.user == accounts[selectedAccount]) {
          isExists = true;
          return (
            <div>
              <AccountInfo></AccountInfo>
              <SwitchRole></SwitchRole>
            </div>
          );
        } else if (element.user == accounts[selectedAccount]) {
          isExists = true;
          return <AccountInfo></AccountInfo>;
        }
      })}
      {!isExists ? (
        <div>
          <Register></Register>
        </div>
      ) : undefined}
    </div>
  );
}

export default App;
