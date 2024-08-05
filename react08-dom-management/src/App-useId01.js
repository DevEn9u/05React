import React, { useId } from 'react'

function App() {
  /**
   * useId
   : 고유한 아이디를 생성해준다.
     DOM에 아이디를 부여하거나 라벨링을 할 때 편리하다.
   */
  const myId = useId();
  console.log("myId", myId);
  
  return (
    <div>
      <MyInput />
    </div>
  )
}

function MyInput() {
  const ageId = useId();
  console.log("ageId", ageId);
  return (
    <div className='App'>
      {/* HTML 속성을 사용하여 연결 */}
      <label htmlFor="name">이름 : </label>
      <input type="text" id='name' />
      <br />
      {/* useId 훅을 사용하여 연결 */}
      <label htmlFor={ageId}>나이 : </label>
      <input type="text" id={ageId} />
    </div>
  )
}

export default App;