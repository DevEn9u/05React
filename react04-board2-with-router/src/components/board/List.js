import React from 'react';
import { Link } from 'react-router-dom';


function List(props) {
  /** 
   * Props로 전달된 객체형 배열을 map()을 통해 반복해서 목록을 생성한다. 
   * 첫번째 매개변수로 현재 루프의 객체가 전달된다.
   * 두번째 매개변수인 index의 경우 사용되지 않으므로 삭제해도 무방하다.
  */
  const lists = props.boardData.map((row, idx) => {
    return (
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        {/* 열람을 위한 link는 "/view/일련번호"와 같은 형태를 사용한다. */}
        <td>
          <Link to={"/view/" + row.no}>{row.title}</Link>
        </td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    );
  });

  return (
    <>
      <header>
        <h2>게시판 - 목록</h2>
      </header>
      <nav>
        <Link to="/write">글쓰기</Link>
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
            {/* map 함수는 반복을 위한 배열과 동일한 크기의 새로운 배열을 생성하므로 여기서 목록을 출력할 수 있다. */}
            {lists}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default List;