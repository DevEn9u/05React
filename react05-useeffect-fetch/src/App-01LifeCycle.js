import './App.css';
import React, { useEffect, useState } from 'react'

/**
 * useEffect
 : 함수형 컴포넌트에서 Life Cycle을 사용하기 위한 훅.
  컴포넌트 내부에서 발생하는 데이터 가져오기, 구독설정, 수동으로 DOM 조작 등과 같은 작업을 수행한다. 컴포넌트가 렌더링된 후 실행할 코드를 정의할 때 주로 사용한다.

  렌더링 후 실행되게 하는 훅 함수.
  화면에 렌더링이 반영될 떄 까지 코드 실행을 의도적으로 지연시키는 역할
 */

// 컴포넌트 렌더링은 해당 함수가 호출되어 실행된다는 의미를 가진다.
function LifeGood(props) {
  /* 이 컴포넌트엡서 제일 먼저 실행되는 코드. 즉 렌더링 전에 실행할 코드가 있다면 이 부분에 작성하면 된다. */
  console.log("#Life", "LifeGood ==> 1. 컴포넌트 실행(함수 호출)");

  /**
   * State 생성
   : 컴포넌트는 State의 상태가 변경될 때마다 새롭게 렌더링된다.
   */
  let [myRandomNum, setMyRandomNum] = useState(props.initNumber);
  let [myCount, setMyCount] = useState(1);

  /**
   * 컴포넌트가 렌더링된 후 실행된다.
     첫 실행에서는 마운트만 되고, 두번째 실행에서는 언마운트, 마운트 순으로 실행된다.
   */
  useEffect(function() {
    console.log("#Life", "useEffect 실행 ==> 3. 컴포넌트 마운트");
    return () => {
      console.log("#Life", "useEffect 실행 ==> 4. 컴포넌트 언마운트");
    }
  // }); // 1. 의존성 배열(두번째 인자) 없음
  // }, []); // 2. 의존성 배열에 빈 배열
  }, [myCount]); // 3. 의존성 배열에 State 변수를 할당함
  /**
   * 의존성 배열에 따른 동작
   1) 의존성 배열이 없는 경우
   - 매 렌더링 시 useEffect가 실행된다.
   - 여기서는 2개의 버튼을 누를 때 실행된다.
   2) 의존성 배열이 있고, 빈 배열일 경우
   - 최초 실행시(마운트 될 때, 즉 컴포넌트가 나타날 때)에만 useEffect가 실행되고, 그 이후에는 실행되지 않는다.
   3) 의존성 배열이 있고 배열에 State 변수를 할당한 경우
   - 마운트 될 때 실행되고, 렌더링 이후 할당한 State 변수에 변화가 있을 때마다 실행된다.
   - 여기서는 최초에 실행되고 그 이후 myCount에 변화가 있을 때마다(카운트 버튼을 누를 때마다) 실행된다.

   useEffect에서 state 변경시 무한 루프(렌더링 실행시 effect가 실행되는데 계속 실행되게 됨)
   */

   /**
    * 앞에서 useEffect가 먼저 선언되었으나, life cycle에서는 렌더링이 먼저 수행되므로, 화면에 UI가 표시된 후 useEffect가 실행된다. 
    */
  console.log("#Life", "return 실행 ==> 2. 렌더링(return문)");
  
  return (
    <div>
      <h4>함수형 컴포넌트의 수명주기 함수</h4>
      <p>난수 : {myRandomNum}</p>
      <p>카운트 : {myCount}</p>
      {/* 버튼을 누를 때마다 난수를 생성하거나 1을 더한 후 State를 변경한다. State 변경시마다 렌더링이 발생한다. */}

      <input type="button" value="난수생성" onClick={() => {
        setMyRandomNum(Math.random());
      }} />
      <input type="button" value="카운트" onClick={() => {
        setMyCount(myCount + 1);
      }} />
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <h2>React Hook - useEffect</h2>
      <LifeGood initNumber={1}></LifeGood>
    </div>
  );
}

export default App;
