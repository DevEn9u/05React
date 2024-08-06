import './App.css';
import { useState } from 'react';

import Board from './commons/Board';
import ComList from './commons/ComList';
import ComWrite from './commons/ComWrite';
import ComEdit from './commons/ComEdit';

// 현재 날짜
const nowDate = () => {
  let dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ('0' + (1 + dateObj.getMonth())).slice(-2);
  let day = ('0' + dateObj.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};

function App() {
  const [myData, setMyData] = useState([
    {
      no: 1,
      comment: '오늘은 React공부하는날',
      writer: '낙짜쌤',
      date: '2023-01-01',
    },
    {
      no: 2,
      comment: '어제는 Javascript공부해씸',
      writer: '유겸이',
      date: '2023-03-03',
    },
    {
      no: 3,
      comment: '내일은 Project해야징',
      writer: '개똥이',
      date: '2023-05-05',
    },
  ]);
  // 댓글 일련번호
  const [nextNo, setNextNo] = useState(4);

  // 댓글 수정
  const editCommentProcess = (no, writer, comment) => {
    console.log('수정', writer, comment);
    let newComData = myData.filter((row) => {
      if (row.no === no) {
        row.writer = writer;
        row.comment = comment;
      }
      return row;
    });
    setMyData(newComData);
  };

  // 댓글 삭제
  const deleteCommentProcess = (comNo) => {
    // 댓글의 일련번호
    console.log('삭제할 댓글의 일련번호', comNo);
    let newComData = myData.reduce((prev, curr) => {
      if (curr.no !== comNo) {
        prev.push(curr);
      }
      return prev;
    }, []);

    setMyData(newComData);
  }
  

  return (
    <div className="App">
      <Board></Board>
      {myData.map((myData) => (
        <ComList
          myData={myData}
          key={myData.no}
          editComment={editCommentProcess}
          deleteComment={deleteCommentProcess}
        />
      ))}
      <ComWrite
        myData={myData}
        setMyData={setMyData}
        nextNo={nextNo}
        setNextNo={setNextNo}
        nowDate={nowDate}
      />
    </div>
  );
}

export default App;
