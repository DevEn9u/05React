import React, { useEffect, useMemo, useState } from 'react';

export default function App() {
  // State 생성
  const [number, setNumber] = useState(0);
  const [switching, setSwitching] = useState(true);

  // 일반적인 상수(Step1) : 초기값은 'On'으로 설정
  // const switchMode = switching ? 'On(켜짐)' : 'Off(꺼짐)';

  // 객체형 상수(Step 2)
  /**
   * JS에서는 객체를 선언할 때마다 새로운 참조값을 할당받게 된다.
     즉 새로운 렌더링을 위해 App 컴포넌트가 호출될 때마다 참조값이 변경된다.
     따라서 useEffect()가 지속적으로 호출된다.
   */
  // const switchMode = {
  //   nowState: switching ? 'On(켜짐)' : 'Off(꺼짐)',
  // };

  /**
   * Step3 : useMemo를 적용하여 switching의 값이 변경될 때만 값을 반환하고, 그렇지 않으면 캐싱된 값을 그대로 사용한다.
   */
  const switchMode = useMemo(() => {
    return {nowState: switching ? 'On(켜짐)' : 'Off(꺼짐)'}
  }, [switching]);

  // SwitchMode가 변경될 때마다 호출되도록 설정
  /**
   * Step1 : primitive type의 값을 할당했으므로 값의 변화가 있을 때만 useEffect를
      호출했음.
   * Step2 : 객체형으로 변경하면 App 컴포넌트가 렌더링될 때마다 새로운 참조값을
      할당받게 되므로 값이 변화된 것으로 인식하여 useEffect가 지속적으로 호출됨.
   * Step3 : 지속적인 변화를 차단하기 위해 useMemo를 통해 Memoization한 값을
      사용하도록 코드를 수정함.
   */
  useEffect(() => {
    console.log('useEffect() 호출됨');
  }, [switchMode]);

  return (
    <div className="App">
      <h2>정수 카운터</h2>
      {/* 스핀박스를 클릭하면 number State(정수 타입)가 변경된다. */}
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <hr />
      <h2>토글 스위치</h2>
      {/* <p>스위치상태(Step1) : {switchMode}</p> */}
      <p>스위치상태(Step2) : {switchMode.nowState}</p>
      {/* 버튼을 누르면 switching State(boolean type)가 변경된다. */}
      <button onClick={() => setSwitching(!switching)}>스위치 조작</button>
    </div>
  );
}
