import './App.css';
import { useState } from 'react';

// 모듈화된 컴포넌트는 확장자에 상관없이 경로명만 명시한 후 임포트하면 된다.
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
  let articleComp, navComp, titleVar;
  if (mode === 'list') {
    titleVar = '게시판 목록 (props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>;
    articleComp = <ArticleList boardData={boardData} onChangeMode={(no=>{
      console.log('선택한 게시물 번호: ' + no);
      setMode('view');
    })}></ArticleList>;
  }
  else if (mode === 'view') {
    titleVar = '게시판 읽기 (props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>;
    articleComp = <ArticleView></ArticleView>;
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