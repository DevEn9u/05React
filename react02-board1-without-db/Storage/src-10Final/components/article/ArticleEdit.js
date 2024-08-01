import React, { useState } from "react";

/**
 수정 페이지를 구성하기 위해 기존 데이터를 Props로 전달받아 <input> 태그의 value 속성값으로 설정한다.
 하지만 이 경우 readonly 속성으로 렌더링 되어 기존의 내용을 수정할 수 없게 된다.
 React에서 Props는 부모가 자식에게 전달하는 파라미터로 '읽기 전용'으로 설정되어 있기 때문이다.(Top-down 방식)

 → 위와 같은 문제로 Props를 State에 저장한 후 onChange 이벤트핸들러를 통해 설정된 내용을 수정할 수 있도록 변경해야 한다.
 *  */ 
function ArticleEdit(props) {
  /* <input> 태그의 개수만큼 State를 생성한다. Props로 전달된 데이터를 각 State에 저장한 후 변환함수까지 정의한다. 
  이렇게 하면 Props는 그 값을 동일하게 유지하게 되고, 복사본인 State만 변경되는 구조가 된다. */
  const [title, setTitle] = useState(props.selectRow.title);
  const [writer, setWriter] = useState(props.selectRow.writer);
  const [contents, setContents] = useState(props.selectRow.contents);

  return (
    <article>
      {/* 수정페이지의 폼값 처리는 쓰기페이지와 완전히 동일하다. */}
      <form onSubmit={(e)=>{
        e.preventDefault();

        // 이벤트 객체의 target 속성을 이용해서 폼 값을 저장한다.
        let title = e.target.title.value;
        let writer = e.target.writer.value;
        let contents = e.target.contents.value;
        // console.log('ArticleEdit 컴포넌트, title, writer, contents');
        // props를 통해 부모로 폼 값 전달
        props.editAction(title, writer, contents);
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              {/* value 속성값은 State로 저장된 값을 설정한다.
              onChange를 통해 입력값을 변경한다. */}
              <th>작성자</th>
              <td><input type="text" name="writer" value={writer} onChange={(e) => {
                setWriter(e.target.value)
              }}></input></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" value={title} onChange={(e) => {
                setTitle(e.target.value)
              }}></input></td>
            </tr>
            <tr>
              <th>내용</th>
              {/* HTML에서는 <textarea> 태그에 value 속성을 사용하지 않지만 JSX에서는 vales 속성을 사용해 기존값을 설정한다. */}
              <td><textarea name="contents" rows="3" value={contents} onChange={(e) => {
                setContents(e.target.value)
              }}></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기"></input>
      </form>
  </article>
  );
}

export default ArticleEdit;