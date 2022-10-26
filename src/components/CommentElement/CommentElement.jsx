import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MarkDesc from "../MarkDesc";
import SendLike from "../SendLike";
import SendMark from "../SendMark";

function CommentMark() {
  const selected = useParams();
  console.log(selected);
  const mark = useSelector(
    (storage) => storage.shops[selected.idShop].bookOfMarks[selected.idMark]
  );

  return (
    <div>
      <h1>Оценка от {mark.appraiser}</h1>
      <MarkDesc mark={mark}></MarkDesc>
      <SendMark></SendMark>
      <div>
        <h2>Комментарии пользователей</h2>
        {mark.comments?.map((element, index) => {
          let likes = 0;
          let dislikes = 0;
          console.log(element);
          element.likes?.map((element) => {
            if (element.isLiked) likes++;
            else dislikes++;
          });
          return (
            <div className="mark-element" data-id={index}>
              <span>Адрес отправителя: {element.sender}</span>
              <br></br>
              <span>Текст комментария: {element.description}</span>
              <br />
              <span>
                Количество лайков:
                {likes}
              </span>
              <br />
              <span>
                Количество дизлайков:
                {dislikes}
              </span>
              <br />
              <SendLike></SendLike>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CommentMark;
