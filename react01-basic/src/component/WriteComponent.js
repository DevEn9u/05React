import React from "react";

function WriteComponent(props) {
  return (
    <>
    <header>
      <h2>게시판 작성</h2>
    </header>
    <nav>
      <a href="/" onClick={(event)=>{
            event.preventDefault();
            props.changeMode('list');
          }}>목록</a>
    </nav>
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
              <td><textarea type="contents" cols="22" rows="3"></textarea></td>
            </tr>
          </tbody>
        </table>
        {/* JSX는 유사 HTML 문법을 사용하므로 반드시 Pair(쌍)을 이뤄야 한다.
        따라서 <input> 태그도 아래와 같이 작성하는 것이 좋다. */}
        <input type="submit" value="전송"></input>
      </form>
    </article>
    </>
  );
}

export default WriteComponent;