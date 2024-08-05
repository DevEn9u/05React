import React, { useEffect, useId, useRef, useState } from 'react'

function App() {
  return (
    <div className='App'>
      <MyInput1 />
    </div>
  )
}

function MyInput1() {
  const myId = useId();
  const myRef = useRef();

  useEffect(() => {
    // 순수 JavaScript를 DOM을 얻어온다.
    const button1 = document.getElementById('btn');
    // useRef 훅을 통해 DOM을 참조한다.
    const button2 = myRef.current;
    console.log('버튼1', button1);
    console.log('버튼2', button2);
  }, []);

// JavaScript를 통해 DOM에 스타일 부여
function btn1Clicked() {
  const button1 = document.getElementById('btn');
  if (button1.style.backgroundColor === 'black') {
    button1.style.backgroundColor = 'white';
    button1.style.color = 'black';
  }
  else {
    button1.style.backgroundColor = 'black';
    button1.style.color = 'white';
  }
};

// State를 통해 객체 형식의 style 부여
const [btnStyle, setBtnStyle] = useState({
  'backgroundColor': 'yellow',
  'color': 'red',
});
const btn2Clicked = () => {
  if (btnStyle.color === 'red') {
    setBtnStyle({
      'backgroundColor': 'blue',
      'color': 'white',
    });
  }
  else {
    setBtnStyle({
      'backgroundColor': 'yellow',
      'color': 'red',
    });
  }
}

  return (
    <div>
      {/* JS를 통해 스타일 변경 */}
      <button id="btn" onClick={btn1Clicked}>버튼1</button>
      {/* React Hook을 통해 스타일 변경 */}
      <button id={myId} ref={myRef} onClick={btn2Clicked} style={btnStyle}>버튼2</button>
    </div>
  )
}

export default App;