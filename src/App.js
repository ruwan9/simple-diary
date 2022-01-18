import React from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "Alex",
    content: "Bello",
    emotion: 4,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "Hailey",
    content: "Hello",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "Taylor",
    content: "Swift",
    emotion: 3,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div>
      <DiaryEditor />
      <DiaryList dummyList={dummyList} />
    </div>
  );
}

export default App;
