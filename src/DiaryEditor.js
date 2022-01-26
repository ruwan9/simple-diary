import React, { useState, useRef } from "react";

function DiaryEditor({ onCreate }) {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  const [toggle, setToggle] = useState({
    authorIsValid: true,
    contentIsValid: true,
  });
  const handleStateChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    if (state.author.length >= 0) {
      setToggle({
        ...toggle,
        authorIsValid: true,
      });
    }
    if (state.content.length >= 4) {
      setToggle({
        ...toggle,
        contentIsValid: true,
      });
    }
  };
  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      setToggle({
        // 아래에 경고 문구
        ...toggle,
        authorIsValid: false,
      });
      return;
    } else if (state.content.length < 5) {
      contentInput.current.focus();
      setToggle({
        // 아래에 경고 문구
        ...toggle,
        contentIsValid: false,
      });
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
    setToggle({
      authorIsValid: true,
      contentIsValid: true,
    });
  };

  return (
    <div className="DiaryEditor">
      <h1>오늘의 일기</h1>
      <div className="input">
        <input
          ref={authorInput}
          onChange={handleStateChange}
          value={state.author}
          name="author"
          type="text"
          placeholder="Author"
        />
        {toggle.authorIsValid ? null : <p>작성자는 최소 1글자 이상 입력해 주세요.</p>}
      </div>
      <div className="textarea">
        <textarea
          ref={contentInput}
          onChange={handleStateChange}
          value={state.content}
          name="content"
          id=""
          cols="30"
          rows="10"
          placeholder="Content"
        ></textarea>
        {toggle.contentIsValid ? null : <p>일기 본문은 최소 5글자 이상 입력해 주세요.</p>}
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

export default React.memo(DiaryEditor);
