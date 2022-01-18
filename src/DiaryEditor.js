import React, { useState, useRef } from "react";

function DiaryEditor() {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleStateChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    } else if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h1>오늘의 일기</h1>
      <div>
        <input ref={authorInput} onChange={handleStateChange} value={state.author} name="author" type="text" placeholder="Author" />
      </div>
      <div>
        <textarea ref={contentInput} onChange={handleStateChange} value={state.content} name="content" id="" cols="30" rows="10" placeholder="Content"></textarea>
      </div>
      <div>
        <span>오늘의 감정점수: </span>
        <select name="emotion" onChange={handleStateChange} value={state.emotion}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
}

export default DiaryEditor;
