import './App.css';
/*
현재문서에서 useState 리액트 훅을 사용하겠다는 의미
*/
import React, { useState } from 'react'

// Top 컴포넌트 정의
function Top(props) {
  return (
    <h2><a href="/" onClick={(e) => {
      e.preventDefault();
      /* Props로 전달된 함수를 호출하여 state를 both로 변경한다. */
      props.myModeChange('both');
    }}>React - State 변경하기</a></h2>
  );
}

/*
MyCont1, 2 Component에서 타이틀 부분을 클릭하는 경우 state를 front, back으로 변경한다.
*/
function MyCont1(props) {
  /* JSX에서 렌더링되는 UI는 반드시 최상위 element가 하나로 구성되어야 한다. 만약 2개 이상의 element가 존재하는 경우 에러가 발생하므로 <></>와 같이 fragment를 사용한다. */
  return (
    <>
    <li><a href="/" onClick={(e) => {
      e.preventDefault();
      props.myModeChange('front');
    }}>프론트앤드</a></li>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Javascript</li>
          <li>jQuery</li>
        </ul>
    </>
  )
}

function MyCont2(props) {
  return (
    <>
    <li><a href="/" onClick={(e) => {
      e.preventDefault();
      props.myModeChange('back');
    }}>백앤드</a></li>
        <ul>
          <li>Java</li>
          <li>Oracle</li>
          <li>JSP</li>
          <li>Spring Boot</li>
        </ul>
    </>
  )
}

function App() {
  /*
  React 16.8부터 새롭게 추가된 기능으로 함수형 컴포넌트에서 state와 생명주기를 연동할 수 있게 해주는 특수한 함수를 'Hook'이라고 한다.

  useState() : 컴포넌트가 가진 state(상태)를 변경하여 새로운 렌더링을 해주는 리액트 훅이다.
  형식]
    const [변수명, set변수명] = useState(초기값);
  */
  const [mode, setMode] = useState('both');

  // 컴포넌트를 저장하기 위한 변수
  let contents = '';
  // state인 mode의 값에 따라 서로 다른 컴포넌트를 변수에 저장한다.
  if (mode === 'front') {
    contents = <>
      <MyCont1 myModeChange = {(mode) => {
        setMode(mode);
      }}></MyCont1>
    </>
  }
  else if (mode === 'back') {
    contents = <>
      <MyCont2 myModeChange = {(mode) => {
        setMode(mode);
      }}></MyCont2>
    </>
  }
  else {
    contents = <>
      <MyCont1 myModeChange={(mode) => {
        setMode(mode);
      }}></MyCont1>
      <MyCont2 myModeChange={(mode) => {
        setMode(mode);
      }}></MyCont2>
    </>
  }
  return (
    <div className="App">
      {/* 부모컴포넌트인 App에서 자식컴포넌트인 Top으로 Props를 통해 함수를 전달한다. 매개변수 mode를 통해 데이터를 받은 후 State를 변경할 수 있는 함수를 호출한다. */}
      <Top myModeChange={(mode) => {
        setMode(mode);
      }}></Top>
      <ol>{contents}</ol>
    </div>
  );
}

export default App;