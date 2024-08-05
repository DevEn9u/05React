import './App.css';
import React, { useEffect, useRef, useState } from 'react'

function App() {
  // useRef를 통해 변수 생성
  const inputRef = useRef();

  useEffect(() => {
    console.log(inputRef);
    // 화면에 렌더링이 끝난 후 input 태그로 포커스가 이동한다.
    inputRef.current.focus();
  }, []);

  const login = () => {
    // <input>의 DOM에 접근해서 value를 얻어온다.
    alert(`${inputRef.current.value} 님, 환영합니다.`);
    // 빈 값을 할당한다.
    inputRef.current.value = '';
    // 포커스를 이동한다.
    inputRef.current.focus();
  }

  return (
    <div className="App">
      {/* 위에서 생성한 useRef를 input의 ref 속성으로 추가한다. */}
      <input type="text" placeholder='아이디를 입력하세요.' ref={inputRef} />
      <button onClick={login}>로그인</button>
    </div>
  );
}

export default App;