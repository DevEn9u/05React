import React from "react";

function ViewComponent(props) {
  return (
    <>
      <header>
        <h2>게시판 읽기</h2>
      </header>  
      <nav>
        <a href="/" onClick={(event)=>{
            event.preventDefault();
            props.changeMode('list');
          }}>목록</a>&nbsp;&nbsp;
        <a href="/" onClick={(e)=>{
            alert('수정');
            e.preventDefault();
          }}>수정</a>&nbsp;&nbsp;
        <a href="/" onClick={(e)=>{
            alert('삭제');
            e.preventDefault();
          }}>삭제</a>
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
              <td>열심히<br></br>합시다</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

export default ViewComponent;