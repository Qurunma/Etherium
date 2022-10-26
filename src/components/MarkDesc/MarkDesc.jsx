import React from "react";

function MarkDesc({ mark }) {
  return (
    <div className="mark-desc">
      <span>Оценка: {mark.rating}</span>
      <br></br>
      <span>Текст оценки: {mark.description}</span>
      <br></br>
      <span>Количество комментариев: {mark.comments.length}</span>
    </div>
  );
}

export default MarkDesc;
