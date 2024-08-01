import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Edit(props) {
  
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;
  const navigate = props.navigate;
  const nowDate = props.nowDate;

  let params = useParams();

  const [title, setTitle] = useState(props.selectRow.title);
  const [writer, setWriter] = useState(props.selectRow.writer);
  const [contents, setContents] = useState(props.selectRow.contents);

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

          let w = e.target.writer.value;
          let t = e.target.writer.value;
          let c = e.target.writer.value;
          props.editAction(title, writer, contents);

          
          // 복사본을 이용해 state를 변경한다. 
          setBoardData(copyBoardData);
          // sequence용 번호도 1 증가
          setNextNo(nextNo + 1);
          // 완료되면 목록으로 이동한다.
          navigate("/list");

        }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" value={vi.writer} onChange={(e) => {
                setWriter(e.target.value)
              }} /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" value={vi.title} onChange={(e) => {
                setTitle(e.target.value)
              }} /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea type="contents" cols="22" rows="3" value={vi.contents} onChange={(e) => {
                setWriter(e.target.value)
              }} ></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
    </>
  )
}

export default Edit;
