import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
import './App.css';
import { firestore } from './firestoreConfig';
import { useEffect, useState } from 'react';

function App() {
  // 날짜 생성 함수
  const nowDate = () => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = ('0' + (1 + dateObj.getMonth())).slice(-2);
    let day = ('0' + dateObj.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  // document 수정을 위한 함수(쓰기와 동일, 내용이 바뀌면 자동으로 수정 처리)
  const memberEdit = async (p_collection, p_id, p_pass, p_name) => {
    /**
     * doc(firestore, collection명, document명), { 수정할 내용을 JSON 객체로 기술 }
     */
    await setDoc(doc(firestore, p_collection, p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regDate: nowDate(),
    });
    alert('수정이 완료되었습니다.');
    console.log('수정성공');
  };

  // <select> 태그의 내용을 추가하기 위한 State 생성
  const [showData, setShowData] = useState([]);

  // 화면에 렌더링이 완료된 후 호출되는 훅
  useEffect(() => {
    const getCollection = async () => {
      let trArray = [];
      // 컬렉션 members를 가져온다.
      const querySnapshot = await getDocs(collection(firestore, 'members'));
      // document의 개수만큼 반복해서 <option> 태그 추가
      querySnapshot.forEach((doc) => {
        let memberInfo = doc.data();
        // <option>태그의 value는 id, text는 name으로 설정한다.
        trArray.push(
          <option key={doc.id} value={doc.id}>
            {memberInfo.name}
          </option>
        );
      });
      return trArray;
    };
    // 함수 호출 후 콜백된 데이터를 then절에서 처리한다.
    getCollection().then((result) => {
      console.log('result', result);
      // State를 변경하여 <select> 태그에 <option>을 추가한다.
      setShowData(result);
    });
  }, []);

  // <input>에 설정된 값은 State를 통해 변경해야 하므로 개수만큼 추가한다.
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동</h2>
      <h3>개별 조회 및 수정하기</h3>
      {/* 항목 하나를 선택하면 onChange 이벤트 발생 */}
      <select
        onChange={async (e) => {
          // 선택 항목의 value, 여기서는 id를 가져온다.
          let user_id = e.target.value;
          console.log('선택', user_id);

          // collection명과 id(document)를 통해 값을 얻어온다.
          const docRef = doc(firestore, 'members', user_id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // 해당 document가 존재하면 데이터를 인출한 후...
            console.log('Document data : ', docSnap.data());
            let callData = docSnap.data();
            // State를 변경하여 <input>에 내용을 설정한다.
            setId(user_id);
            setPass(callData.pass);
            setName(callData.name);
          } else {
            console.log('No such Document!');
          }
        }}
      >
        <option value="">선택하세요</option>
        {showData}
      </select>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // submit 이벤트가 발생하면 폼값을 받아온다.
          let collection = e.target.collection.value;
          let id = e.target.id.value;
          let pass = e.target.pass.value;
          let name = e.target.name.value;

          // 빈값 검증
          if (id === '') {
            alert('사용자를 먼저 선택해주세요.');
            return;
          }

          // 수정을 위한 함수 호출
          memberEdit(collection, id, pass, name);

          // 수정이 완료되면 입력폼을 빈 값으로 설정.
          // e.target.id.value = '';
          // e.target.pass.value = '';
          // e.target.name.value = '';
          setId('');
          setPass('');
          setName('');
        }}
      >
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <td>컬렉션(테이블)</td>
              <td>
                <input type="text" name="collection" value="members" readOnly />
              </td>
            </tr>
            <tr>
              <td>아이디(변경불가)</td>
              <td>
                <input
                  type="text"
                  name="id"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <input
                  type="text"
                  name="pass"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default App;
