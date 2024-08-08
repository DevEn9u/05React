import './ChatMessage.css';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { realtime } from '../realtimeConfig';
import { child, onValue, push, ref, set } from 'firebase/database';

const scrollTop = (chatWindow) => {
  console.log('scrollTop 호출됨');
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

function ChatMessage() {
  // 전달된 파라미터 조작
  const [searchParmas, setSearchParams] = useSearchParams();
  const roomId = searchParmas.get('roomId');
  const userId = searchParmas.get('userId');

  // 채팅 내역이 보여지는 부분의 DOM을 참조
  const chatWindow = useRef();
  const [chatData, setChatData] = useState('');

  // Realtime에 대화 내역 저장
  function chatWrite(chatRoom, chatId, chatMessage) {
    // 고유 키 생성
    const newKey = push(child(ref(realtime), 'tempValue')).key;
    // 현재 시간 구하기
    const timestamp = new Date().toISOString();
    // 채팅방 하위에 고유키를 이용해 구분한 후 대화 내역 입력
    set(ref(realtime, chatRoom + '/' + newKey), {
      id: chatId,
      message: chatMessage,
      timestamp: timestamp,
    });
  }

  /**
   * Realtime 주요 메서드
   1) ref()
   - database의 특정 위치를 참조하는데 사용
   - 예시: const dbRef = ref(database, 'users/1234')
     이는 db에서 'users/1234' 경로를 가리키는 참조를 생성한다.
   2) onValue()
   - 참조한 데이터의 값을 실시간으로 수신하는 리스너
   - 데이터가 변경될 때마다 자동으로 호출되는 콜백 함수를등록하여, 데이터의 변화를 
     실시간으로 반영함
   3) push()
   - 참조한 위치에 새 데이터를 추가
   4) set()
   - 참조한 위치에 데이터를 설정하거나 덮어쓴다. 기존 데이터를 완전히 덮어쓴다.
   */

  // Realtime Listener
  const dbRef = ref(realtime, roomId);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      let showDiv = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const formattedTime = formatTimestamp(childData.timestamp);

        if (childData.id === userId) {
          // showDiv.push(<div className="myMsg">{childData.message}</div>);
          showDiv.push(
            <div className="d-flex flex-end flex-row-reverse justify-content-start align-items-center myMsg">
              <div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                  alt="avatar 1"
                  style={{ width: '45px', height: '100%' }}
                />
                <p className="small p-2 mb-1">{childData.id}</p>
              </div>
              <p className="small p-2 mb-1 text-white rounded-3 bg-primary">
                {childData.message}
              </p>
              <small className="me-2 text-muted">{formattedTime}</small>
            </div>
          );
        } else {
          showDiv.push(
            <div className="d-flex justify-content-start align-items-center mb-4 otherMsg">
              <div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  alt="avatar 1"
                  style={{ width: '45px', height: '100%' }}
                  className='text-center'
                />
                <p className="small mb-1">{childData.id}</p>
              </div>
              <p className="small p-2 mb-1 rounded-3 bg-body-tertiary">
                {childData.message}
              </p>
              <small className=" text-muted">{formattedTime}</small>
            </div>
          );
        }
        scrollTop(chatWindow.current);
      });
      setChatData(showDiv);
    });
  }, []);

  return (
    <main id="container">
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="card" id="chat2">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">{roomId}</h5>
                  대화명: {userId}
                </div>
                <div
                  className="card-body ps"
                  data-mdb-perfect-scrollbar-init
                  style={{ position: 'relative', height: '400px' }}
                >
                  <div className="d-flex flex-row justify-content-start">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                  </div>
                  <div className="divider d-flex align-items-center mb-4">
                    <p
                      className="text-center mx-3 mb-0"
                      style={{ color: '#a2aab7' }}
                    >
                      Today
                    </p>
                  </div>
                  <div className="mb-4 pt-1">
                    <div ref={chatWindow}>{chatData}</div>
                  </div>
                </div>
                <div className="card-footer text-muted d-flex align-items-center p-3 gap-custom">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 4"
                    style={{ width: '45px', height: '100%' }}
                  />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      let chatRoom = e.target.chatRoom.value;
                      let chatId = e.target.chatId.value;
                      if (chatId.trim() === '') {
                        alert('대화명을 입력하세요.');
                        return;
                      }
                      let message = e.target.message.value;
                      if (message === '') {
                        alert('메세지를 입력하세요.');
                        return;
                      }
                      console.log('submit', chatRoom, chatId, message);
                      // 입력한 폼값을 정리해서 Realtime에 입력
                      chatWrite(chatRoom, chatId, message);
                      // 입력이 완료되면 <input>을 비워준다.
                      e.target.message.value = '';
                    }}
                    className="d-flex gap-custom"
                  >
                    <input type="hidden" name="chatRoom" value={roomId} />
                    <input type="hidden" name="chatId" value={userId} />
                    <input
                      type="text"
                      name="message"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput1"
                      placeholder="메세지를 입력하세요."
                      style={{ margin: '0' }}
                    />
                    <button
                      type="submit"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary btn-sm submit_btn"
                      data-mdb-ripple-color="dark"
                    >
                      전송
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ChatMessage;
