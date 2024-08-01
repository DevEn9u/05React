// 컴포넌트 모듈화를 위해 제일 먼저 필요한 React import 구문이다.
import React from "react";

// 함수형 컴포넌트는 일반적인 JS 함수와 같이 정의한다.
function ListComponent(props) {
  /* 컴포넌트에서 실제 표현해야 할 UI를 return문 내부에 기술한다.
  클래스형 컴포넌트의 render() 함수와 동일한 역할을 한다. */
  return (
    <>
    {/* JSX를 표현할 때는 최상위 엘리먼트가 반드시 하나여야 하므로
    <></>와 같은 빈 꺽쇄 괄호를 사용한다. 이것을 '프레그먼트'라고 한다. */}
    <header>
     <h2>게시판 목록</h2>
    </header>
    <nav>
      <a href="/" onClick={(event)=>{
        // 이벤트 객체를 통해 클릭 이벤트를 차단한다.
        event.preventDefault();
        /* 부모가 전달한 Props를 통해 자식 쪽의 데이터를 전달한다.
        죽, 부모에서 전달해준 함수를 호출함으로써 자식은 부모 쪽으로 데이터를 전닳할 수 있다. */
        props.changeMode('write');
      }}>글쓰기</a>
    </nav>
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="cen">1</td>
            {/* 부모에서 전달된 props를 아래와 같이 호출해서 mode를 view로 변경한다. */}
            <td><a href="/" onClick={(event)=>{
              event.preventDefault();
              props.changeMode('view');
            }}>React 공부</a></td>
            <td class="cen">leehr</td>
            <td class="cen">2024-07-31</td>
          </tr>
        </tbody>
      </table>
    </article>
    </>
  );
}

export default ListComponent;