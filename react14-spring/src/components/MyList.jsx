import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MyList(props) {
  /*
   * State 선언
   Spring 서버에서 API를 통해 JSON 배열을 받은 후 저장한다.
   따라서 초기값은 빈 배열로 설정한다.
   */
  let [myJSON, setMyJSON] = useState([]);

  /*
   Component의 Life Cycle에서 사용하는 Hook으로 해당 컴포넌트가
   렌더링이 완료되면 자동으로 호출된다.
   */
  useEffect(function () {
    /*
      JavaScript에서 제공하는 비동기 함수로 Spring 서버의 List API를
      호출하여 결과를 콜백받는다.
     */
    fetch('http://localhost:8586/restBoardList.do?pageNum=1')
      .then((result) => {
        // console.log("결과1");
        // console.log(result);
        // 첫번재 then 절로 콜백되면 JSON 형식으로 변환 후 두번째 then절로 넘긴다.
        return result.json();
      })
      .then((json) => {
        console.error('결과');
        console.log(json);
        // 여기(두번째 then절)서 State를 변경하고 새롭게 렌더링한다.
        setMyJSON(json);
      });
    return () => {
      console.log('#Life', 'useEffect실행 => 컴포넌트 언마운트');
    };
  }, []);

  let trTag = [];
  /*
  수명주기 함수에서 fetch()를 통해 콜백받은 데이터를 여기에서 반복한 후
  trTag 배열에 추가한다. 최초에는 빈 배열이므로 반복되지 않는다.
   */
  for (let i = 0; i < myJSON.length; i++) {
    let data = myJSON[i];
    // console.log(data);
    trTag.push(
      <tr key={data.num}>
        <td>{data.num}</td>
        <td>
          <Link to={'/view/' + data.num}>{data.title}</Link>
        </td>
        <td>{data.id}</td>
        <td>{data.postdate}</td>
        <td>{data.visitcount}</td>
      </tr>
    );
  }

  return (
    <div>
      <h2>Spring 게시판[목록]</h2>
      <table border="1">
        <thead>
          <tr>
            <th>num</th>
            <th>title</th>
            <th>id</th>
            <th>postdate</th>
            <th>visitcount</th>
          </tr>
        </thead>
        <tbody>{trTag}</tbody>
      </table>
      <Link to="/write">작성</Link>
    </div>
  );
}
