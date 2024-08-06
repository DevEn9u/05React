import React from 'react';

export default function Counter(props) {
  return (
    <>
      <div className="counter">
        {/* Player 컴포넌트에서 Props를 통해 내려준 함수를 호출하여
        점수를 증감시킨다. */}
        <button
          className="counter-action decrement"
          onClick={(e) => {
            // console.log('-버튼', props.id);
            // 함수 호출 시 falg와 플레이어의 일련번호를 전달
            props.onChangeScore('-', props.idx);
          }}
        >
          -
        </button>
        <span className="counter-score">{props.score}</span>
        <button
          className="counter-action increment"
          onClick={(e) => {
            // console.log('+버튼', props.id);
            props.onChangeScore('+', props.idx);
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
