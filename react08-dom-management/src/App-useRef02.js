import './App.css';
import React, { useRef, useState } from 'react'

function App() {
  // 화면에 새로운 렌더링을 위한 State 정의
  const [renderer, setRenderer] = useState(0);
  // Ref를 0으로 정의
  const countRef = useRef(0);
  // 일반변수를 0으로 정의
  let countVar = 0;

  /**
   * 값 변화를 위한 확인 목적을 가진, 렌더링만 하게 하는 함수
   * State를 변경해서 화면을 새롭게 렌더링한다.
   */
  const doRendering = () => {
    setRenderer(renderer + 1);
  };

  // Ref를 1씩 증가
  const increseRef = () => {
    countRef.current = countRef.current + 1;
    console.log('ref', countRef.current);
  };

  // 일반변수를 1씩 증가
  const increseVar = () => {
    countVar = countVar + 1;
    console.log('var', countVar);
  };

  // 각 변수의 현재값을 출력한다.
  const printResult = () => {
    console.log(`ref: ${countRef.current}, var: ${countVar}`);
  }

  /**
   * State를 변경시키면 그때마다 화면이 새롭게 렌더링된다.
    이것은 App() 재호출하는 것이므로 지역변수로 선언된 countVar는 그때마다 0으로
    초기화된다.
    즉 컴포넌트의 생명주기 안에서 값을 유지하고 싶다면 State나 Ref를 사용해야 하고
    그렇지 않다면 일반변수를 사용하면 된다.
   */
  return (
    <div className="App">
      <p>Ref : {countRef.current}</p>
      <p>Var : {countVar}</p>
      <button onClick={doRendering}>렌더링</button>
      <button onClick={increseRef}>Ref 증가</button>
      <button onClick={increseVar}>Var 증가</button>
      <button onClick={printResult}>Ref/Var 출력</button>
    </div>
  );
}

export default App;
