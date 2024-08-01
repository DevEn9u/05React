import React from 'react';
import { Link } from 'react-router-dom';

function View(props) {
  return (
    <>
      <header>
        <h2>게시판 - 읽기</h2>
      </header>  
      <nav>
        {/* <a href="/list">목록</a>&nbsp;
        <a href="/edit">수정</a>&nbsp;
        <a href="/delete">삭제</a> */}
        <Link to="/list">목록</Link>&nbsp;
        <Link to="/edit">수정</Link>&nbsp;
        <Link to="/delete">삭제</Link>
      </nav>
      <article>
        <table id="boardTable">
          <colgroup>
            <col width="30%" /><col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>DevEn</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>React 공부</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>2024-08-01</td>
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

export default View;