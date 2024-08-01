import React from "react";

function ArticleView(props) {
  return (
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%" /><col width="*" />
        </colgroup>
        <tbody>
        <tr>
          <th>작성자</th>
          <td>leehr</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>React 공부</td>
        </tr>
        <tr>
          <th>날짜</th>
          <td>2024-07-31</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>열심히<br></br>합시다</td>
        </tr>
      </tbody>
      </table>
    </article>
  );
}

export default ArticleView;