import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "../components/MainPage";
import AdminPanel from "../components/AdminPanel";
import AddShop from "../components/AddShop";
import AddAdmin from "../components/AddAdmin";
import ChangeRole from "../components/ChangeRole";
import DeleteShop from "../components/DeleteShop/DeleteShop";
import MarkElement from "../components/MarkElement";
import CommentElement from "../components/CommentElement";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/admin" element={<AdminPanel></AdminPanel>}></Route>
        <Route path="/admin/add-admin" element={<AddAdmin></AddAdmin>}></Route>
        <Route path="/admin/add-shop" element={<AddShop></AddShop>}></Route>
        <Route
          path="/admin/change-role"
          element={<ChangeRole></ChangeRole>}
        ></Route>
        <Route
          path="/admin/delete-shop"
          element={<DeleteShop></DeleteShop>}
        ></Route>
        <Route
          path="/shops/:idShop"
          element={<MarkElement></MarkElement>}
        ></Route>
        <Route
          path="/shops/:idShop/:idMark"
          element={<CommentElement></CommentElement>}
        ></Route>
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
