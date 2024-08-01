import React from 'react';
import { Link, useParams } from 'react-router-dom';

function View(props) {
  /**
   * useParams : 컴포넌트를 라우터 처리할 때 중첩된 구조내에서 :no와 같이 사용된 파라미터의 값을 얻어올 수 있는 훅 함수
   */
  let params = useParams();
  console.log("파라미터", params.no);

  /**
   * reduce()
   - 배열의 크기만큼 반복하여 조건에 맞는 하나의 값을 반환한다.
   - 여기서는 일련번호와 일치하는 객체 데이터를 반환한다.
   */

  let vi = props.boardData.reduce((prev, curr) => {
    if (curr.no === Number(params.no)) {
      /**
       * 초기값이 {}(빈 객체)로 주어졌으므로 배열의 크기만큼 반복할 수 있다. 조회할 게시물의 일련번호와 일치하는 객체를 찾아 prev에 저장한 후 반환한다.
       */
      prev = curr;
    }
    return prev;
  }, {});

  let readNum = Number(params.no);
  let prevNum = 0, nextNum = 0;

  if (readNum - 1 === 0) {
    prevNum = 1;
  }
  else {
    prevNum = Number(params.no) - 1;
  }

  nextNum = readNum + 1;
  let isNextNum = props.boardData.reduce((prev, curr) => {
    if (curr.no === nextNum) {
      prev = true;
    }
    return prev;
  }, false);
  if (isNextNum === false) {
    // 현재 페이지로 고정
    nextNum = readNum;
  }

  // 반환된 객체는 vi에 저장한 후 아래에서 출력한다.
  return (
    <>
      <header>
        <h2>게시판 - 읽기</h2>
      </header>  
      <nav>
        <Link to="/list">목록</Link>&nbsp;
        <Link to={"/edit/" + params.no}>수정</Link>&nbsp;
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
              <td>{vi.writer}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{vi.title}</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>{vi.date}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{vi.contents}</td>
            </tr>
          </tbody>
        </table>
        <Link to={"/view/" + prevNum}>이전글</Link>
        <Link to={"/view/" + nextNum}>다음글</Link>
      </article>
    </>
  )
}

export default View;