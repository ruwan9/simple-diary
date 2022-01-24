import React, { useCallback, useState, useEffect, useRef, useMemo } from "react";
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

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);
  const onRemove = useCallback((targetId) => {
    // console.log(targetId);
    // console.log(newDiaryList);
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);
  const onEdit = useCallback((targetId, newContent) => {
    setData((data) => data.map((it) => (it.id === targetId ? { ...it, content: newContent } : it)));
  }, []);
  const getDiaryAnalysis = useMemo(() => {
    // console.log("분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <div>
        <div>전체 일기: {data.length}</div>
        <div>기분이 좋은 일기: {goodCount}</div>
        <div>기분이 안좋은 일기: {badCount}</div>
        <div>기분 좋은 일기 비율: {goodRatio} %</div>
      </div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} itemList={data} />
    </div>
  );
}

export default App;
