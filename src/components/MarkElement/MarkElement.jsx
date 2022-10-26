import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SendMark from "../SendMark";
import SendLike from "../SendLike";

function MarkElement() {
  const selectedShop = useParams().idShop;
  console.log(selectedShop);
  const shop = useSelector((storage) => storage.shops[selectedShop]);

  return (
    <div>
      <h1>Оценки магазина {shop.shop}</h1>
      <SendMark id={selectedShop} isComments={true}></SendMark>
      <div>
        <h2>Оценки магазина</h2>
        {shop.bookOfMarks?.map((element, index) => {
          let likes = 0;
          let dislikes = 0;
          console.log(element);
          element.likes?.map((element) => {
            if (element.isLiked) likes++;
            else dislikes++;
          });
          return (
            <div className="mark-element" data-id={index}>
              <span>Адрес отправителя: {element.appraiser}</span>
              <br></br>
              <span>Оценка: {element.rating}</span>
              <br></br>
              <span>Количество комментариев: {element.comments.length}</span>
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
              <Link to={"./" + index}>
                <button>Открыть оценки магазина</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MarkElement;
