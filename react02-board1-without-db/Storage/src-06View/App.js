import './App.css';
import { useState } from 'react';

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
  const boardData = [
    {no: 1, title: '오늘은 React 공부', writer: 'leehr', date: '2024-07-31', contents: 'React 어렵다,,,'},
    {no: 2, title: '어제는 Javascript 공부', writer: 'hrchicken', date: '2024-07-24', contents: 'Javascript 쉽네요 ㅋ'},
    {no: 3, title: '내일은 Project', writer: 'nakja', date: '2024-08-01', contents: '무슨 프로젝트일까요?'},
  ];
  const [mode, setMode] = useState('list');
  /* 선택한 게시물의 일련번호를 저장한다.
  선택한 게시물은 없으므로 null로 초기화한다. */
  const [no, setNo] = useState(null);
  let articleComp, navComp, titleVar, selectRow;
  if (mode === 'list') {
    titleVar = '게시판 목록 (props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>;
    articleComp = <ArticleList boardData={boardData} onChangeMode={(no=>{
      // 일련번호를 콘솔에 출력한다.
      console.log('선택한 게시물 번호: ' + no);
      // 화면을 '읽기'로 state 전환한다.
      setMode('view');
      // 선택한 게시물의 일련번호로 state를 변경한다.
      setNo(no);
    })}></ArticleList>;
  }
  else if (mode === 'view') {
    titleVar = '게시판 읽기 (props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>;
    console.log('현재 no: ', no, typeof(no));
    // 데이터로 사용 중인 객체형 배열의 크기만큼 반복하여 검색한다.
    for (let i=0; i<boardData.length; i++) {
      // 선택한 게시물의 번호와 일치하는 객체를 검색한다.
      if (no === boardData[i].no) {
        // 일치하는 객체를 변수에 저장한다.
        selectRow = boardData[i];
      }
    }
    // props를 통해 View 컴포넌트로 객체를 전달한다.
    articleComp = <ArticleView selectRow={selectRow}></ArticleView>;
  }
  else if (mode === 'write') {
    titleVar = '게시판 쓰기 (props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>;
    articleComp = <ArticleWrite></ArticleWrite>;
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