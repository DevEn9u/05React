import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyWrite(props) {
  /* 페이지 이동을 위한 Hook으로 JSP의 sendRedirect()와 동일하다. */
  const navigate = useNavigate();
  /* 테이블에 저장된 아이디만 입력이 가능하므로 musthave로 지정하는
     State 선언. */
  const [inputValue, setInputValue] = useState('musthave');

  /* state가 쓰이는 input태그에 value속성으로 값이 정해져있으므로 
     이를 변경하기 위해서 onChange 이벤트핸들러가 필요하고, 
     이벤트 핸들러에 쓰이는 함수(값 입력시 입력한 값으로 바꿔줌)를 정의 */
  const writerHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h2>Spring 게시판[작성]</h2>
      <form
        onSubmit={(e) => {
          // submit이 되면 렌더링이 생기므로 여기서 차단.
          e.preventDefault();
          // event 객체를 통해 폼값 받음
          let id = e.target.id.value;
          let title = e.target.title.value;
          let content = e.target.content.value;

          // 파라미터저장`
          /*
        * URLSearchParams
        - 파라미터룰 저장해주는 JavaScript 객체로 DTO와 동일하다.
        -
        */
          const params = new URLSearchParams();
          params.set('id', id);
          params.set('title', title);
          params.set('content', content);

          /*
           post 방식으로 데이터 전송하기 위한 JSON 객체 생성.
           body 프로퍼티에 실제 전송할 폼값을 저장한다.
           */
          const data = {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=utf-8',
            },
            body: params,
          };
          // Spring 서버와 통신
          fetch('http://localhost:8586/restBoardWrite.do', data)
            .then((result) => {
              return result.json();
            })
            .then((json) => {
              console.log(json);
              if (json.result === 1) {
                console.log('글쓰기 성공');
              }
            });
          // 글쓰기가 완료되면 목록으로 이동한다.
          navigate('/list');
        }}
      >
        <table>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>
                <input
                  type="text"
                  name="id"
                  // value="musthave"
                  value={inputValue}
                  onChange={writerHandler}
                />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="title" />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea name="content" cols="22" rows="3"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
