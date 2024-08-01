import React from 'react';
import { Link } from 'react-router-dom';

function Write(props) {
  //  State와 관련 데이터, 함수를 모두 받아온다.
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;
  const navigate = props.navigate;
  const nowDate = props.nowDate;

  return (
    <>
      <header>
        <h2>게시판 - 작성</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // event 객체를 통해 입력값을 얻어옴.
            let w = e.target.writer.value;
            let t = e.target.title.value;
            let c = e.target.contents.value;

            // 추가할 객체 생성
            let addBoardData = {
              no: nextNo,
              writer: w,
              title: t,
              contents: c,
              date: nowDate(),
            };
            
            // spread 문법을 이용해 복사본을 생성한 후 데이터를 추가
            let copyBoardData = [...boardData];
            copyBoardData.push(addBoardData);
            
            // 복사본을 이용해 state를 변경한다. 
            setBoardData(copyBoardData);
            // sequence용 번호도 1 증가
            setNextNo(nextNo + 1);
            // 완료되면 목록으로 이동한다.
            navigate("/list");
          }}
        >
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td>
                  <input type="text" name="writer" />
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
                  <textarea name="contents" cols="22" rows="3"></textarea>
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

export default Write;
