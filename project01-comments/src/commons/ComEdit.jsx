import React from 'react';
import { useState } from 'react';

function ComEdit(props) {
  const [writerName, setWriterName] = useState(props.myData.writer);
  const [commentCon, setCommentCon] = useState(props.myData.comment);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          let writer = e.target.writer.value;
          let comment = e.target.comment.value;
          props.editComment(props.comIdx, writer, comment);
          props.setShowEdit(false);
        }}
      >
        <table id="boardTable">
          <tbody>
            <tr>
              <td id="writer">
                Writer :
                <input
                  type="text"
                  name="writer"
                  value={writerName}
                  onChange={(e) => {
                    setWriterName(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    props.setShowEdit(!props.showEdit);
                  }}
                >
                  수정 취소
                </button>
              </td>
              <td rowSpan="2">
                <input type="submit" value="댓글수정" id="btn" />
              </td>
            </tr>
            <tr>
              <td>
                <textarea
                  name="comment"
                  value={commentCon}
                  onChange={(e) => {
                    setCommentCon(e.target.value);
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
