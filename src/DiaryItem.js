import React, { useState, useRef } from "react";

function DiaryItem({ id, author, content, emotion, created_date, onRemove, onEdit }) {
  const localContentInput = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              onChange={(event) => {
                setLocalContent(event.target.value);
              }}
              value={localContent}
              name=""
              cols="30"
              rows="10"
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
}

export default DiaryItem;
