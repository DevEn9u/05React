import React, { useState } from 'react';
import { realtime } from '../realtimeConfig';
import { child, get, getDatabase, push, ref, remove, set, update } from 'firebase/database';
import Navi from './Navi';

function RealtimeCRUD() {
  // Realtime Database 연결 확인
  console.log('realtime 연결 확인:', realtime);

  /**
   * 데이터 쓰기
   - set() : 기본 쓰기 작업에 사용한다. 지정된 참조에 데이터를 저장하고
    해당 경로의 기존 데이터를 모두 변경할 수 있다.

   */
  function writeUserData(userId, userName, userPass) {
    // 등록을 위한 새로운 키값이 생성된다.(-03jYG  같은 형식으로 생성됨)
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    /**
     * 최상위 노드를 users로 하고 하위는 사용자가 입력한 Id로 데이터를 구분하여
       입력한다. 만약 아이디가 동일하면 덮어쓰기 된다.
     */
    set(ref(realtime, 'users/' + userId), {
      name: userName,
      pass: userPass,
      fireKey: newPostKey,
    });
    console.log('입력성공');
  }

  // 데이터 읽기
  function readUserData(userId) {
    // getDatabase로 database 얻어오기
    const dbRef = ref(getDatabase());
    // node에 등록된 id가 있는지 확인 후 데이터 가져옴
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // 데이터가 존재하는 경우 console 출력
          console.log(snapshot.val());
        } else {
          console.log('No Data available');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // 데이터 수정
  function editUserData(userId, userName, userPass) {
    // 고유키 생성
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    // 수정할 데이터를 객체 형식으로 작성
    const postData = {
      name: userName,
      pass: userPass,
      fireKey: newPostKey,
    };

    // 아이디로 지정된 데이터를 찾아서 수정한다.
    const updates = {};
    updates['/users/' + userId] = postData;
    return update(ref(realtime), updates);
  }

  // 데이터 삭제1 - 기존 데이터를 null로 대체해서 삭제
  function deleteUserData1(userId) {
    // 기존 데이터를 null로 대체해서 삭제
    const deletes = {};
    deletes['/users/' + userId] = null;
    return update(ref(realtime), deletes);
  }

  // 데이터 삭제2 - remove 함수를 통해 데이터 삭제
  function deleteUserData2(userId) {
    // remove 함수를 통해 데이터 삭제
    remove(ref(realtime, 'users/' + userId))
      .then(() => {
        console.log('삭제 완료');
      })
      .catch((err) => {
        console.error('삭제 실패', err);
      });
  }
  // 입력을 위한 State로 <input>의 스핀박스를 누를 때마다 변경된다.
  const [addNum, setAddNum] = useState(0);

  // 입력데이터, 변경된 State가 즉시 적용된다.
  let adder = '-' + addNum;
  const id = 'deven' + adder;
  const name = '데브엔' + adder;
  const pass = '1234' + adder;

  return (
    <div className="App">
      <Navi />
      <h2>Firebase = Realtime Database App</h2>
      <h3>01. CRUD</h3>
      {/* number 타입의 <input> 태그에 스핀박스가 생성되어 변경할 수 있다. */}
      <input
        type="number"
        value={addNum}
        onChange={(e) => {
          setAddNum(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          writeUserData(id, name, pass);
        }}
      >
        입력
      </button>
      <button
        type="button"
        onClick={() => {
          readUserData(id);
        }}
      >
        읽기
      </button>
      <button
        type="button"
        onClick={() => {
          editUserData(id, name + 'edit', pass + 'edit');
        }}
      >
        수정
      </button>
      <button
        type="button"
        onClick={() => {
          deleteUserData1(id);
        }}
      >
        삭제1
      </button>
      <button
        type="button"
        onClick={() => {
          deleteUserData2(id);
        }}
      >
        삭제2
      </button>
    </div>
  );
}

export default RealtimeCRUD;
