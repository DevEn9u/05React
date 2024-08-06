import React from 'react';

function ComWrite(props) {
  const myData = props.myData;
  const setMyData = props.setMyData;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;
  const nowDate = props.nowDate;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          let w = e.target.writer;
          let c = e.target.comment;

          if (w.value.trim() === '') {
            alert('작성자를 입력하세요');
            w.focus();
            return;
          }
          if (c.value.trim() === '') {
            alert('내용을 입력하세요');
            c.focus();
            return;
          }
          // 추가할 객체
          let addComData = {
            no: nextNo,
            writer: w.value,
            comment: c.value,
            date: nowDate(),
          };

          // 복사본 생성
          let copyComData = [...myData];
          copyComData.push(addComData);

          setMyData(copyComData);
          setNextNo(nextNo + 1);

          w.value = '';
          c.value = '';
        }}
      >
        <table id="boardTable">
          <tbody>
            <tr>
              <td id="writer">
                Writer : <input type="text" name="writer" />
              </td>
              <td rowSpan="2">
                <input type="submit" value="댓글작성" id="btn" />
              </td>
            </tr>
            <tr>
              <td>
                <textarea name="comment"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

export default ComWrite;
