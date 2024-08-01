import './App.css';

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
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
}

function Article(props) {
  const lists = [];
  for (let i=0; i<props.boardData.length; i++) {
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/' + row.no} onClick={(event)=>{
          // 함수 호출 시 게시물의 일련번호를 인수로 전달한다.
          event.preventDefault();
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
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
          {lists}
        </tbody>
      </table>
    </article>
  )
}

function App() {
  const boardData = [
    {no: 1, title: '오늘은 React 공부', writer: 'leehr', date: '2024-07-31', contents: 'React 어렵다,,,'},
    {no: 2, title: '어제는 Javascript 공부', writer: 'hrchicken', date: '2024-07-24', contents: 'Javascript 쉽네요 ㅋ'},
    {no: 3, title: '내일은 Project', writer: 'nakja', date: '2024-08-01', contents: '무슨 프로젝트일까요?'},
  ];
  return (
    <div className="App">
      <Header title="게시판 목록 (props)"></Header>
      <Nav onChangeMode={function() {
        alert('글쓰기 페이지로 이동');
      }}></Nav>
      <Article boardData={boardData} onChangeMode={(no)=>{
        alert('선택한 게시물 번호: ' + no);
      }}></Article>
    </div>
  );
}

export default App;