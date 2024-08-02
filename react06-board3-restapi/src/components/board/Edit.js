import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react"; 

function Edit(props) {
  // 페이지 이동을 위한 Hook
  const navigate = useNavigate();
  let params = useParams();
  console.log("수정idx", params.idx);

  // const [boardData, setBoardData] = useState({});
  const requestUrl = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php';
  const parameter = 'tname=nboard_javascript&idx=' + params.idx;

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  
  useEffect(function () {
    fetch(requestUrl + '?' + parameter)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        console.log(json);
        // 콜백 데이터로 State 변경
        // setBoardData(json);
        setWriter(json.name);
        setTitle(json.subject);
        setContents(json.content);
      });
      return () => {
        console.log('useEffect 실행 ==> 컴포넌트 언마운트');
      };
    }, []);
  
  return (
    <>
      <header>
        <h2>게시판 - 수정</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // target 속성을 통해 입력한 폼값을 얻어옴
            let i = e.target.idx.value;
            let w = e.target.writer.value;
            let t = e.target.title.value;
            let c = e.target.contents.value;
            console.log(w, t, c);

            /**
             * 글 작성을 위해 Post 전송방식을 사용한다.
             * fetch 함수의 첫번째 인자는 '요청 URL', 두번째 인자는 전송방식 및 헤더, 폼값을 추가한다.
             */
            fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
              // 전송방식
              method: 'POST',
              // enctype(전송시 인코딩 방식)과 케릭셋 지정
              headers: {
                'Content-type':
                  'application/x-www-form-urlencoded;charset=UTF-8',

              },
              body: new URLSearchParams({
                tname: 'nboard_javascript',
                id: 'jsonAPI',
                name: w,
                subject: t,
                content: c,
                idx : i,
              }),
            })
              .then((response) => response.json())
              .then((json) => console.log(json));

            // 글쓰기가 완료되면 list로 이동
            navigate('/view/' + params.idx);
          }}
        >
          <input type="hidden" name="idx" value={params.idx} />
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td>
                  <input type="text" name="writer" value={writer} onChange={(e) => {
                    setWriter(e.target.value);
                  }}/>
                </td>
              </tr>
              <tr>
                <th>제목</th>
                <td>
                  <input type="text" name="title" value={title} onChange={(e) => {
                    setTitle(e.target.value);}}/>
                </td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <textarea name="contents" cols="22" rows="3" value={contents} onChange={(e) => {
                    setContents(e.target.value);}}></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="전송" />
        </form>
      </article>
    </>
  );
}

export default Edit;
