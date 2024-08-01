import "./App.css";
// 글쓰기시 BrowserRouter 처리는 index.js로 옮긴 후 작성
// import { BrowserRouter } from 'react-router-dom';

// 라우터 처리를 위한 임포트
import { Routes, Route } from "react-router-dom";
// 글쓰기 완료시 페이지 이동을 위한 훅 import
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import List from "./components/board/List";
import Write from "./components/board/Write";
import View from "./components/board/View";
import NotFound from "./components/common/NotFound";
import Edit from "./components/board/Edit";

// 현재날짜를 YYYY-MM-DD 형식으로 변환
const nowDate = () => {
  let dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
};

function App() {
  // 기존 객체형 배열을 State로 변경
  const [boardData, setBoardData] = useState([
    {
      no: 1,
      title: "오늘은 React공부하는날",
      writer: "DevEn",
      date: "2024-01-01",
      contents: "React를 뽀개봅시당.",
    },
    {
      no: 2,
      title: "어제는 JavaScript공부했어",
      writer: "James",
      date: "2024-03-03",
      contents: "JS를 뽀개봅시당.",
    },
    {
      no: 3,
      title: "내일은 Project하는날",
      writer: "DevEn",
      date: "2024-05-05",
      contents: "Project를 뽀개봅시당.",
    },
  ]);
  // 게시물의 일련번호 부여를 위한 sequence 용도의 state
  const [nextNo, setNextNo] = useState(4);
  // 작성 완료 후 페이지 이동을 위한 React Hook
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List boardData={boardData} />} />
        <Route path="/list" element={<List boardData={boardData} />} />
        {/* 게시물 열람(view)의 경우 조회할 게시물의 일련번호가 필요하므로 중첩된 라우터 구조로 정의한다. :no는 router-dom에서 제공하는 useParams Hook을 통해 값을 얻어올 수 있다. */}
        <Route path="/view">
          <Route path=":no" element={<View boardData={boardData} />}></Route>
        </Route>
        {/* Wirte 컴포넌트 내에서 글쓰기 처리를 할 수 있도록 App.js에서 생성한 모든 State와 관련함수를 Props로 전달한다. */}
        <Route path="/edit">
          <Route
            path=":no"
            element={
              <Edit
                boardData={boardData}
                setBoardData={setBoardData}
                nextNo={nextNo}
                setNextNo={setNextNo}
                navigate={navigate}
                nowDate={nowDate}
              />
            }
          ></Route>
        </Route>
        <Route
          path="/write"
          element={
            <Write
              boardData={boardData}
              setBoardData={setBoardData}
              nextNo={nextNo}
              setNextNo={setNextNo}
              navigate={navigate}
              nowDate={nowDate}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
