import React from "react";
import { useSelector } from "react-redux";

function MarkElement() {
  return (
    <div>
      <span className="mark-id"></span>
      <span className="mark-sender"></span>
      <span className="mark-count-comments"></span>
      <button>
        <a href="/marks">Открыть ветку комментариев</a>
      </button>
    </div>
  );
}
export default MarkElement;
