import './App.css';
import React, { useState } from 'react';

import NavList from './components/navigation/NavList'
import NavView from './components/navigation/NavView'
import NavWrite from './components/navigation/NavWrite'
import ArticleList from './components/article/ArticleList'
import ArticleView from './components/article/ArticleView'
import ArticleWrite from './components/article/ArticleWrite'

function ReadyComp() {
  return (
    <div>
      <h3>컴포넌트 준비 중</h3>
      <a href="/">Home 바로가기</a>
    </div>
  );
}

function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
}

function App() {
  /* 글쓰기 처리를 위해 기존 상수를 state로 변경한다.
  데이터의 변화에 따라 화면을 새롭게 렌더링 해야 하기 때문이다. */
  const [boardData, setBoardData] = useState([
    {no: 1, title: '오늘은 React 공부', writer: 'leehr', date: '2024-07-31', contents: 'React 어렵다,,,'},
    {no: 2, title: '어제는 Javascript 공부', writer: 'hrchicken', date: '2024-07-24', contents: 'Javascript 쉽네요 ㅋ'},
    {no: 3, title: '내일은 Project', writer: 'nakja', date: '2024-08-01', contents: '무슨 프로젝트일까요?'},
  ]);

  // 화면 mode 변경을 위한 state이다.
  const [mode, setMode] = useState('list');

  // 상세보기를 위한 선택한 게시물 번호 state이다.
  const [no, setNo] = useState(null);

  /* 게시글 작성할 때 일련번호 부여하기 위한 state 선언한다.
  오라클의 Sequece와 동일한 목적으로 사용한다.
  현재 등록된 게시물이 3개이므로 4로 초기화한다. */
  const [nextNo, setNextNo] = useState(4);

  let articleComp, navComp, titleVar, selectRow;

  if (mode === 'list') {
    titleVar = '게시판 목록 (props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>;
    articleComp = <ArticleList boardData={boardData} onChangeMode={(no=>{
      console.log('선택한 게시물 번호: ' + no);
      setMode('view');
      setNo(no);
    })}></ArticleList>;
  }
  else if (mode === 'view') {
    titleVar = '게시판 읽기 (props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>;
    console.log('현재 no: ', no, typeof(no));
    for (let i=0; i<boardData.length; i++) {
      if (no === boardData[i].no) {
        selectRow = boardData[i];
      }
    }
    articleComp = <ArticleView selectRow={selectRow}></ArticleView>;
  }
  else if (mode === 'write') {
    titleVar = '게시판 쓰기 (props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>;
    
    // Write 컴포넌트에서 작성한 폼 값을 전달받기 위한 함수를 정의하여 props로 전달한다.
    articleComp = <ArticleWrite writeAction={(t, w, c)=>{
      console.log("App.js", t, w, c);

      // 작성일을 생성하기 위해 Date 객체를 생성한다.
      let dateObj = new Date();

      // 년도
      var year = dateObj.getFullYear();
      // getMonth(): 현재 월을 반환해주는 함수로 0~11까지를 반환하므로 1을 더해줘야 한다.
      var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
      // getDate(): 현재 날짜를 반환한다.
      var day = ("0" + dateObj.getDate()).slice(-2);

      /* 현재 월과 일이
          - 한 자리인 경우에는 0n과 같이 설정하고
          - 두 자리인 경우에는 01n, 02n, 03n과 같이 표현되므로 끝에서 두 자리만 잘라낸다.
          
      따라서 0000-00-00의 포맷으로 날짜를 구할 수 있다. */ 
      let nowDate = year + "-" + month + "-" + day;

      /* 추가할 객체 생성,
      새로운 게시물의 일련번호는 nextNo를 통해 사용하면 되므로 4부터 시작한다. */
      let addBoardData = {no: nextNo, title: t, writer: w, contents: c, date: nowDate};

      // 추가 방법 1
      // 스프레드 연산자로 복사본 배열 데이터를 하나 생성한다.
      let copyBoardData = [...boardData];
      // 복사된 배열에 새로운 객체(= 데이터)를 추가하한다.
      copyBoardData.push(addBoardData);
      // 복사된 배열로 기존 state를 변경한다.
      setBoardData(copyBoardData);
      /* React는 State가 변경될 때 원본 배열을 사용하면 변경을 감지하지 못하여 새로운 렌더링이 되지 않는다.
      따라서 배열의 복사본을 만든 후 값을 추가(변경)하고 이를 통해 State를 변경해야 한다. */

      // 추가 방법 2
      // // 원본 배열에 새로운 객체를 추가한다.
      // boardData.push(addBoardData);
      // // 콘솔을 통해 변경된 내용을 확인한다.
      // console.log(boardData);
      // // 원본 배열로 State를 변경한다.
      // setBoardData(boardData);

      // 일련번호로 사용하는 State를 1 증가시킨다.
      setNextNo(nextNo + 1);
      // 글쓰기가 완료되면 mode를 '목록'으로 전환한다.
      setMode('list');
    }}></ArticleWrite>;
  }
  else if (mode === 'delete') {
    // 삭제 1
    // 새로운 빈 배열을 하나 생성
    let newBoardData = [];
    // 데이터의 크기만큼 반복
    for(let i = 0; i < boardData.length; i++) {
      // 삭제할 일련번호와 일치하지 않는 객체를 검색
      if (no !== boardData[i].no) {
        newBoardData.push(boardData[i]);
        // 검색된 객체를 새로운 배열에 추가
      }
      // 따라서 삭제할 객체는 배열에 추가되지 않는다.
    }
    // 복사본 배열을 통해 State를 생성한다.
    setBoardData(newBoardData);
  
    // 삭제2
    /* 원본 배열에서 splice 함수를 통해 선택한 객체를 삭제한다. */
    // for(let i = 0; i < boardData.length; i++) {
    //   if (no === boardData[i].no) {
    //     newBoardData.splice(i, 1);
    //   }
    // }
    // setBoardData(newBoardData);

    // 삭제가 완료되면 리스트로 전환한다.
    setMode('list');
  }
  else {
    navComp = <ReadyComp></ReadyComp>;
    articleComp = '';
  }

  return (
    <div className="App">
      <Header title={titleVar}></Header>
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;