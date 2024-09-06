import './ChatMessage.css';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { realtime } from '../realtimeConfig';
import { child, onValue, push, ref, set } from 'firebase/database';

const scrollTop = (chatWindow) => {
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

function ChatMessage() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const chatWindow = useRef();
  const timerRef = useRef();
  const [chatData, setChatData] = useState('');

  function chatWrite(chatRoom, chatId, chatMessage) {
    const newKey = push(child(ref(realtime), 'tempValue')).key;
    const timestamp = new Date().toISOString();
    set(ref(realtime, chatRoom + '/' + newKey), {
      id: chatId,
      message: chatMessage,
      timestamp: timestamp,
    });
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function getDay(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      weekday: 'short',
    });
  }

  function groupMessagesByDate(messages) {
    const groupedMessages = {};
    messages.forEach((msg) => {
      const date = getDay(msg.timestamp);
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(msg);
    });
    return groupedMessages;
  }

  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      // clearInterval(timerRef.current);
      // timerRef.current = setTimeout(() => {
      //   scrollTop(chatWindow.current);
      // }, 300);
      scrollTop(chatWindow.current);
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        messages.push({
          id: childData.id,
          message: childData.message,
          timestamp: childData.timestamp,
        });
      });

      const groupedMessages = groupMessagesByDate(messages);

      const showDiv = Object.keys(groupedMessages).map((date) => {
        const dateMessages = groupedMessages[date];
        return (
          <div key={date}>
            <div className="divider d-flex align-items-center mb-4">
              <p className="text-center mx-3 mb-0" style={{ color: '#a2aab7' }}>
                {date}
              </p>
            </div>
            {dateMessages.map((msg) => {
              const formattedTime = formatTimestamp(msg.timestamp);
              return msg.id === userId ? (
                <div
                  key={msg.timestamp}
                  className="d-flex flex-end flex-row-reverse justify-content-start align-items-center myMsg"
                >
                  <div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                    <p className="small p-2 mb-1">{msg.id}</p>
                  </div>
                  <p className="small p-2 mb-1 me-3 text-white rounded-3 bg-primary">
                    {msg.message}
                  </p>
                  <small className="me-2 text-muted">{formattedTime}</small>
                </div>
              ) : (
                <div
                  key={msg.timestamp}
                  className="d-flex justify-content-start align-items-center mb-4 otherMsg"
                >
                  <div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                      className="text-center"
                    />
                    <p className="small mb-1">{msg.id}</p>
                  </div>
                  <p className="small p-2 mb-1 ms-3 rounded-3 bg-body-tertiary">
                    {msg.message}
                  </p>
                  <small className="text-muted">{formattedTime}</small>
                </div>
              );
            })}
          </div>
        );
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
                      chatWrite(chatRoom, chatId, message);
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
