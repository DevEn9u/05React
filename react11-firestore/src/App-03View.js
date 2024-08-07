import './App.css';
import { firestore } from './firestoreConfig';
// collection, document를 얻어오기 위한 함수 import
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';

function App() {
  // 데이터를 저장할 state 생성
  const [showData, setShowData] = useState([]);

  // collection 정보 조회
  const getCollection = async() => {
    let trArray = [];
    // collection 명으로 지정한 하위 document를 얻어옴.
    const querySnapshot = await getDocs(collection(firestore, 'members'));
    // document의 개수만큼 반복
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      // document를 하나씩 인출한다.
      let memberInfo = doc.data();
      // console.log("파싱", doc.id, memberInfo.pass, memberInfo.name, memberInfo.regDate);
      // <tr> 태그로 배열에 저장
      trArray.push(
        <tr key={doc.id}>
          <td className="cen">{doc.id}</td>
          <td className="cen">{memberInfo.pass}</td>
          <td className="cen">{memberInfo.name}</td>
          <td className="cen">{memberInfo.regDate}</td>
        </tr>
      );
    });
    // 파싱된 데이터를 통해 state를 변경하고 새롭게 렌더링
    setShowData(trArray);
  };

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동</h2>
      <h3>전체 조회</h3>
      <button type="button" onClick={getCollection}>전체 조회</button>
      <table className="table table-borderd">
        <thead>
          <tr className="text-center">
            <th>아이디</th>
            <th>비밀번호</th>
            <th>이름</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {showData}
        </tbody>
      </table>
    </div>
  );
}

export default App;
