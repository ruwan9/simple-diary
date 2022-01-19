import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const dataId = useRef(0);
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments").then((res) => res.json());
    // console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5 + 1),
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  const onRemove = (targetId) => {
    // console.log(targetId);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    // console.log(newDiaryList);
    setData(newDiaryList);
  };
  const onEdit = (targetId, newContent) => {
    setData(data.map((it) => (it.id === targetId ? { ...it, content: newContent } : it)));
  };

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} itemList={data} />
    </div>
  );
}

export default App;
