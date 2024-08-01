import React from "react";

// 수정페이지의 navigation
function NavWrite(props) {
  /* 수정은 '읽기'에서 진입하게 되므로 '뒤로'는 읽기 페이지로 전환한다. */
  return (
    <nav>
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onBack();
      }}>뒤로</a>
      {" "}
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  );
}

export default NavWrite;