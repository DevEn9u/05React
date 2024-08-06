import React from 'react';
import { useState } from 'react';

function ComEdit(props) {
  const [writer, setWriter] = useState(props.selectData.writer);
  const [contents, setContents] = useState(props.selectData.contents);
  //console.log("작성자", props.selectData.writer);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          //폼값 가져오기
          let writer = event.target.writer.value;
          let contents = event.target.contents.value;
          //입력값 지우기
          event.target.writer.value = '';
          event.target.contents.value = '';
          //수정 처리 하기
          props.editAction(writer, contents);
        }}
      >
        <table>
          <tbody>
            <tr>
              <td>
                Writer :
                <input
                  type="text"
                  name="writer"
                  value={writer}
                  onChange={(event) => {
                    setWriter(event.target.value);
                  }}
                />
                <input
                  type="button"
                  value="수정취소"
                  onClick={() => {
                    props.changeMode('list', null);
                  }}
                ></input>
              </td>
              <td rowSpan="2">
                <input type="submit" value="댓글수정" id="btn" />
              </td>
            </tr>
            <tr>
              <td>
                <textarea
                  name="contents"
                  cols="51"
                  rows="5"
                  value={contents}
                  onChange={(event) => {
                    setContents(event.target.value);
                  }}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

export default ComEdit;
