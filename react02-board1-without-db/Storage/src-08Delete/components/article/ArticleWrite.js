import React from "react";

// 작성 컴포넌트
function ArticleWrite(props) {
  return (
    <article>
      {/* submit 이벤트 리스너 추가 및 폼 값 처리를 위한 함수 선언 */}
      <form onSubmit={(event)=>{
        event.preventDefault();

        // 이벤트 객체의 target 속성을 이용해서 폼 값을 저장한다.
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;

        // props를 통해 부모로 폼 값 전달
        props.writeAction(title, writer, contents);
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer"></input></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title"></input></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name="contents" rows="3"></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송"></input>
      </form>
  </article>
  );
}

export default ArticleWrite;