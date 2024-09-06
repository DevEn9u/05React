import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function MyView(props) {
  /*
    파라미터로 전달되는 값을 받기 위해 사용하는 Hook.
    열람의 요청명은 "view/일련번호" 형식으로 정의하였고, Router 설정시
    num으로 결정되어 있다.
   */
  let params = useParams();
  console.log('파라미터', params.num);

  // API 통신 후 얻어올 게시물의 레코드를 저장할 State
  let [boardRow, setBoardRow] = useState({});

  // Component 렌더링 후 자동으로 호출되는 수명주기 Hook
  useEffect(function () {
    // parameter로 전달된 일련번호를 변경해서 fetch 함수 호출
    fetch('http://localhost:8586/restBoardView.do?num=' + params.num)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        console.error('결과');
        console.log(json);
        // API를 통해 얻어온 값으로 State 변경하여 새롭게 렌더링한다.
        setBoardRow(json);
      });

    // 파싱된 내용을 출력
    return () => {
      console.log('#Life', 'useEffect 실행 => 컴포넌트 언마운트');
    };
  }, []);

  return (
    <div>
      <h2>Spring 게시판[조회]</h2>
      <table border="1">
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{boardRow.id}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{boardRow.title}</td>
          </tr>
          <tr>
            <th>작성일</th>
            <td>{boardRow.postdate}</td>
          </tr>
          <tr>
            <th>작성내용</th>
            <td>{boardRow.content}</td>
          </tr>
        </tbody>
      </table>
      <Link to="/list">목록</Link>
    </div>
  );
}
