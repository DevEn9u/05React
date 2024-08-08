import React, { useRef } from 'react';
import Navi from './Navi';

const ChatStart = () => {
  // <input> 태그의 DOM을 활용하기 위해 useRef 훅 사용
  const refRoom = useRef();
  const refId = useRef();

  // open() 함수를 통해 채팅창을 팝업으로 열어준다.
  /**
   * open(url, name, attribute) : Js에서 새로운 팝업창을 열 때 사용하는 함수
   - 팝업창으로 <ChatMessage> 컴포넌트를 렌더링 한다.
   * 
   */
  const openChatWin = () => {
    window.open(
      `/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '',
      'width=500, height=700'
    );
  };

  return (
    <div className="App">
      <Navi />
      <h2>Firebase =- Realtime Database Chatting</h2>
      {/* <input> 태그에 앞에서 생성한 ref변수를 추가하여 DOM에 접근 */}
      방명 : <input
        type="text"
        name="roomId"
        value="room1"
        ref={refRoom}
        readOnly
      />{' '}
      <br />
      대화명 : <input
        type="text"
        name="userId"
        ref={refId}
      />{' '}
      <br />
      <button type="button" onClick={openChatWin}>
        채팅 시작
      </button>
    </div>
  );
};

export default ChatStart;
