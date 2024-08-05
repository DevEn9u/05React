import React, { useId } from 'react'

function App() {
/**
 * 각 컴포넌트별로 여러 개의 DOM을 추가해야 하는 경우에는 useId로
   하나의 아이디를 생성한 후 -xxx와 같은 형태로 추가적인 이름을
   부여해서 사용할 수 없다.
 */
  return (
    <div className='App'>
      <MyInput1 />
      <MyInput2 />
    </div>
  )
}

function MyInput1() {
  const id = useId();
  return (
    <div>
      {/* HTML 속성을 사용하여 연결 */}
      <label htmlFor={`${id}-id`}>아이디 : </label>
      <input type="text" id={`${id}-id`} name='myId' />
      <br />
      {/* useId 훅을 사용하여 연결 */}
      <label htmlFor={`${id}-pass`}>패스워드 : </label>
      <input type="text" id={`${id}-pass`} name='myPass' />
    </div>
  )
}
function MyInput2() {
  const id = useId();
  return (
    <div>
      {/* HTML 속성을 사용하여 연결 */}
      <label htmlFor={`${id}-name`}>이름 : </label>
      <input type="text" id={`${id}-name`} name='myName' />
      <br />
      {/* useId 훅을 사용하여 연결 */}
      <label htmlFor={`${id}-age`}>나이 : </label>
      <input type="text" id={`${id}-age`} name='myAge' />
    </div>
  )
}

export default App;