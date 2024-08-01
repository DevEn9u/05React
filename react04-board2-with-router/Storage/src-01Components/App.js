import './App.css';

function List(props) {
  return (
    <>
      <header>
        <h2>게시판 - 목록</h2>
      </header>
      <nav>
        <a href="/write">글쓰기</a>
      </nav>
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
            <tr>
              <td class="cen">1</td>
              <td><a href="/view/1">React 공부</a></td>
              <td class="cen">DevEn</td>
              <td class="cen">2024-08-01</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  )
}

function View(props) {
  return (
    <>
      <header>
        <h2>게시판 - 읽기</h2>
      </header>  
      <nav>
        <a href="/list">목록</a>&nbsp;
        <a href="/edit">수정</a>&nbsp;
        <a href="/delete">삭제</a>
      </nav>
      <article>
        <table id="boardTable">
          <colgroup>
            <col width="30%" /><col width="*" />
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
              <td>열심히 합시다</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  )
}

function Write(props) {
  return (
    <>
      <header>
        <h2>게시판 - 작성</h2>
      </header>
      <nav>
        <a href="/list">목록</a>
      </nav>
      <article>
        <form>
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td><input type="text" name="writer" /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" /></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea type="contents" cols="22" rows="3"></textarea></td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="전송" />
        </form>
      </article>
    </>
  )
}

function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. ㅜㅜ
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <List />
      <View />
      <Write />
      <NotFound />
    </div>
  );
}

export default App;
