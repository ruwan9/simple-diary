import React, { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// const dummyList = [
//   {
//     id: 1,
//     author: "Alex",
//     content: "Bello",
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "Hailey",
//     content: "Hello",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "Taylor",
//     content: "Swift",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const dataId = useRef(0);

  const [data, setData] = useState([]);

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

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList itemList={data} />
    </div>
  );
}

export default App;
