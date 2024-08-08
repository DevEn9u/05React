import React, { useEffect, useState } from 'react';
import { realtime } from '../realtimeConfig';
import { onValue, ref } from 'firebase/database';
import Navi from './Navi';

function Listener() {
  console.log('aa.realtime', realtime);

  // State 생성(출력 데이터 저장)
  const [fireData, setFireData] = useState([]);
  // users node를 참조한 객체
  const dbRef = ref(realtime, 'users');
  // 렌더링 완료 후 내에 있는 함수 실행
  useEffect(() => {
    /**
     * onValue()
     : 경로의 데이터를 읽고 변경사항을 감지하기 위해 수신 대기한다.
       이벤트 발생 시점에 특정 경로에 있는 컨텐트의 정적 스냅샷을 읽는데 사용한다.
       node의 하위 요소를 포함하여 데이터가 변경될 때마다 동작한다.
     */
    onValue(dbRef, (snapshot) => {
      let showTr = [];
      // 데이터 전체를 배열로 가져온다.
      snapshot.forEach((childSnapshot) => {
        // 각 객체의 key와 value를 추출한다.
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childKey, childData);
        // 각 항목을 <tr>로 생성한다.
        showTr.push(
          <tr key={childKey}>
            <td>{childKey}</td>
            <td>{childData.name}</td>
            <td>{childData.pass}</td>
            <td>{childData.fireKey}</td>
          </tr>
        );
      });
      console.log('bb', showTr);
      // State를 변경하여 새롭게 렌더링 한다.
      setFireData(showTr);
    });
  }, []);
  console.log('cc');
  return (
    <div className="App">
      <Navi />
      <h2>Firebase - Realtime Database App</h2>
      <h3>02. Listener</h3>
      <table border={1} className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>아이디</th>
            <th>이름</th>
            <th>패스워드</th>
            <th>고유키</th>
          </tr>
        </thead>
        <tbody>{fireData}</tbody>
      </table>
    </div>
  );
}

export default Listener;
