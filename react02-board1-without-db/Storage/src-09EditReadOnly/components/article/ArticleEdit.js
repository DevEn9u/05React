import React from "react";

/**
 수정 페이지를 구성하기 위해 기존 데이터를 Props로 전달받아 <input> 태그의 value 속성값으로 설정한다.
 하지만 이 경우 readonly 속성으로 렌더링 되어 기존의 내용을 수정할 수 없게 된다.
 React에서 Props는 부모가 자식에게 전달하는 파라미터로 '읽기 전용'으로 설정되어 있기 때문이다.(Top-down 방식)
  
 *  */ 
function ArticleEdit(props) {
  return (
    <article>
      {/* submit 이벤트 리스너 추가 및 폼 값 처리를 위한 함수 선언 */}
      <form onSubmit={(event)=>{
        event.preventDefault();

        // 이벤트 객체의 target 속성을 이용해서 폼 값을 저장한다.
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;
        // console.log('ArticleEdit 컴포넌트, title, writer, contents');

        // props를 통해 부모로 폼 값 전달
        props.editAction(title, writer, contents);
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" value={props.selectRow.writer}></input></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" value={props.selectRow.title}></input></td>
            </tr>
            <tr>
              <th>내용</th>
              {/* HTML에서는 <textarea> 태그에 value 속성을 사용하지 않지만 JSX에서는 vales 속성을 사용해 기존값을 설정한다. */}
              <td><textarea name="contents" rows="3" value={props.selectRow.contents}></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기"></input>
      </form>
  </article>
  );
}

export default ArticleEdit;