import './App.css';

/*
컴포넌트는 일반적인 JavaScript 함수와 같이 생성하면 된다.
단 return문에 있는 내용이 렌더링 되는 UI이므로 필수적으로 작성되어야 한다.
*/
function MyBody() {
  return (
    <ol>
      <li>프론트앤드</li>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Javascript</li>
        <li>jQuery</li>
      </ul>
      <li>백앤드</li>
      <ul>
        <li>Java</li>
        <li>Oracle</li>
        <li>JSP</li>
        <li>Spring Boot</li>
      </ul>
    </ol>
  );
}

function App() {
  return (
    <div className="App">
      <h2>React-컴포넌트</h2>
      {/* 컴포넌트는 HTML 태그와 같이 기술하면 된다.*/}
      <MyBody />
      <MyBody />
      <MyBody />
    </div>
  );
}

export default App;
