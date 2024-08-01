import './App.css';

/*
Props
: React에서 상태를 저장하기 위한 값으로 부모 컴포넌트가 자식 컴포넌트로 전달하는 읽기 전용 데이터를 말한다. 전달시에는 HTML의 속성처럼 기술한다.
형식]
  <컴포넌트명 props속성명 = {속성값} />
*/
/*
App 컴포넌트에서 2개의 Props를 전달하고 있으므로 매개변수 props로 한꺼번에 받은 후 사용할 수 있다.
*/
function MyBody(props) {
  const liTag1 = [], liTag2 = [];

  // 첫번째 Props는 일반 for문을 통해 index로 요소에 접근한다.
  for (let i = 0; i < props.propData1.length; i++) {
    console.log(props.propData1[i]);
    // 각 루프에서 배열에 JSX 항목을 하나씩 추가한다.
    liTag1.push(
      <li key = {i}>{props.propData1[i]}</li>
    );
  }

  /**
   React에서는 게시판의 목록과 같이 반복적으로 출력되는 항목에 중복되지 않는 key prop를  쓰도록 권고하고 있다.
   주로 배열의 index나 일련번호를 통해 부여하면 된다.
   그렇지 않으면 경고가 발생한다.
   */

  // 두번째 데이터는 for~of문을 사용해서 index 없이 요소에 접근한다.
  let keyCnt = 0;
  for (let row of props.propData2) {
    liTag2.push(
      <li key = {keyCnt++}>{row}</li>
     );
  }

  /* 앞에서 생성한 배열변수를 렌더링을 위한 return 문장에 변수형태로 삽입한다. */
  return (
    <ol>
      <li>프론트앤드</li>
      <ul>
        {liTag1}
      </ul>
      <li>백앤드</li>
      <ul>
        {liTag2}
      </ul>
    </ol>
  );
}

function App() {
  // props로 사용할 배열 변수 선언
  const myData1 = ['HTML5', 'CSS', 'JavaScript', 'jQuery'];
  const myData2 = ['JAVA', 'Oracle', 'JSP', 'Spring Boot'];

  // UI를 렌더링 하는 문장
  return (
    <div className="App">
      <h2>React - Props 전달하기</h2>
      {/* MyBody 컴포넌트로 2개의 Props를 전달한다. 전달시에는 HTML의 속성과 같이 기술하면 된다. 변수일 때는 중괄호를 사용하고, 일반적인 문자열을 전달할 때는 double quotation을 사용한다.*/}
      <MyBody propData1 = {myData1} propData2 = {myData2}></MyBody>
    </div>
  );
}

export default App;
