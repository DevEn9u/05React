import './App.css';
import { useState } from 'react';

// 준비 중 컴포넌트
function ReadyComp() {
  return (
    <div>
      <h3>컴포넌트 준비 중</h3>
      <a href="/">Home 바로가기</a>
    </div>
  );
}

function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
}

// 목록의 네비게이션
function NavList(props) {
  return (
    <nav>
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
}

// 내용 보기의 네비게이션
function NavView(props) {
  // 띄어쓰기 할 때는 HTML과 동일하게 nbsp 혹은 {" "}와 같이 기술할 수 있다.
  return (
    <nav>
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>&nbsp;
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode('delete');
      }}>삭제</a>
    </nav>
  );
}

// 작성하기의 네비게이션
function NavWrite(props) {
  return (
    <nav>
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  );
}

// 게시판 목록
function ArticleList(props) {
  const lists = [];
  for (let i=0; i<props.boardData.length; i++) {
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/' + row.no} onClick={(event)=>{
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

// 게시판 읽기
function ArticleView(props) {
  return (
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%" /><col width="*" />
        </colgroup>
        <tbody>
        <tr>
          <th>작성자</th>
          <td>leehr</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>React 공부</td>
        </tr>
        <tr>
          <th>날짜</th>
          <td>2024-07-31</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>열심히<br></br>합시다</td>
        </tr>
      </tbody>
      </table>
    </article>
  );
}

// 게시판 작성
function ArticleWrite(props) {
  return (
    <article>
      <form>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer"></input></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title"></input></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name="contents" rows="3"></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송"></input>
      </form>
  </article>
  );
}

function App() {
  const boardData = [
    {no: 1, title: '오늘은 React 공부', writer: 'leehr', date: '2024-07-31', contents: 'React 어렵다,,,'},
    {no: 2, title: '어제는 Javascript 공부', writer: 'hrchicken', date: '2024-07-24', contents: 'Javascript 쉽네요 ㅋ'},
    {no: 3, title: '내일은 Project', writer: 'nakja', date: '2024-08-01', contents: '무슨 프로젝트일까요?'},
  ];
  /* 화면 전환을 위한 State 생성
  변수명은 mode, 초기값은 list, 변경 시 사용할 함수는 setMode()로 선언한다. */
  const [mode, setMode] = useState('list');
  // 컴포넌트와 제목 저장용 변수
  let articleComp, navComp, titleVar;
  // mode에 따라 화면을 전환할 수 있도록 분기한다.
  if (mode === 'list') {
    titleVar = '게시판 목록 (props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>;
    articleComp = <ArticleList boardData={boardData} onChangeMode={(no=>{
      console.log('선택한 게시물 번호: ' + no);
      setMode('view');
    })}></ArticleList>;
  }
  else if (mode === 'view') {
    titleVar = '게시판 읽기 (props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>;
    articleComp = <ArticleView></ArticleView>;
  }
  else if (mode === 'write') {
    titleVar = '게시판 쓰기 (props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>;
    articleComp = <ArticleWrite></ArticleWrite>;
  }
  else {
    // 앞에서 설정한 mode가 없다면 '준비 중'을 렌더링한다.
    navComp = <ReadyComp></ReadyComp>;
    articleComp = '';
  }
  return (
    <div className="App">
      <Header title={titleVar}></Header>
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;