import React, { useState } from 'react';
import ComEdit from './ComEdit';

function ComList(props) {
  let myData = props.myData;
  const [showEdit, setShowEdit] = useState(false);

  let editForm = showEdit && (
    <ComEdit
      myData={myData}
      comIdx={myData.no}
      showEdit={showEdit}
      setShowEdit={setShowEdit}
      editComment={props.editComment}
    />
  );
  return (
    <>
      <table id="boardTable">
        <tbody>
          <tr key={myData.no}>
            <td>{myData.no}</td>
            <td>{myData.writer}</td>
            <td>
              {myData.date}
              <button
                type="button"
                onClick={() => {
                  if (showEdit) {
                    alert('현재 수정 mode입니다. 수정 취소를 먼저 눌러주세요.');
                    return;
                  }
                  setShowEdit(!showEdit);
                }}
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('삭제할까요?')) {
                    props.deleteComment(myData.no);
                  }
                }}
              >
                삭제
              </button>
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
              dangerouslySetInnerHTML={{
                __html: myData.comment.replace(/\n/g, '<br />'),
              }}
            ></td>
          </tr>
        </tbody>
      </table>
      {editForm}
    </>
  );
}

export default ComList;
