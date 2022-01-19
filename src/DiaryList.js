import React from "react";
import DiaryItem from "./DiaryItem";

function DiaryList({ itemList, onDelete }) {
  return (
    <div className="DiaryList">
      <h1>일기 리스트</h1>
      <h4>{itemList.length}개의 일기가 있습니다.</h4>
      {/* {console.log(itemList)} */}
      <div>
        {itemList.map((it) => (
          <DiaryItem onDelete={onDelete} key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
}

export default DiaryList;
