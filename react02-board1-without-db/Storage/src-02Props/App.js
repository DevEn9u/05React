import './App.css';

// 매개변수 props를 통해 전달된 값을 받아 사용한다.
function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
}

function Nav(props) {
  return (
    <nav>
      <a href="/">글쓰기</a>
    </nav>
  );
}

function Article(props) {
  const lists = [];
  // props로 전달된 객체형 배열의 크기만큼 반복한다.
  for (let i=0; i<props.boardData.length; i++) {
    // 각 루프에 해당하는 객체를 꺼낸 후 lists에 추가한다.
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/' + row.no}>{row.title}</a></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    );
  }
  return (
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* 배열에 추가한 데이터를 출력한다. */}
          {lists}
        </tbody>
      </table>
    </article>
  )
}

function App() {
  // 게시판의 데이터로 사용할 객체형 배열을 생성한다.
  const boardData = [
    {no: 1, title: '오늘은 React 공부', writer: 'leehr', date: '2024-07-31', contents: 'React 어렵다,,,'},
    {no: 2, title: '어제는 Javascript 공부', writer: 'hrchicken', date: '2024-07-24', contents: 'Javascript 쉽네요 ㅋ'},
    {no: 3, title: '내일은 Project', writer: 'nakja', date: '2024-08-01', contents: '무슨 프로젝트일까요?'},
  ];
  return (
    <div className="App">
      {/* 문자열은 ""을 통해 props를 전달할 수 있다. */}
      <Header title="게시판 목록 (props)"></Header>
      <Nav></Nav>
      {/* 변수는 {}을 통해 전달한다. */}
      <Article boardData={boardData}></Article>
    </div>
  );
}

export default App;