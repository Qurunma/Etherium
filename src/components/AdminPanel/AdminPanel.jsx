import React from "react";
import { Link } from "react-router-dom";

function AdminPanel() {
  return (
    <div className="admin-panel">
      <h1></h1>
      <Link to="./add-admin">
        <button>Добавить администратора</button>
      </Link>
      <Link to="./add-shop">
        <button>Добавить магазин</button>
      </Link>
      <Link to="./change-role">
        <button>Изменить роль покупателя/продавца</button>
      </Link>
      <Link to="./delete-shop">
        <button>Удалить магазин</button>
      </Link>
    </div>
  );
}
export default AdminPanel;
