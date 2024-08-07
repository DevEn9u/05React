import './App.css';
import { firestore } from './firestoreConfig';
import { doc, setDoc } from 'firebase/firestore';

function App() {
  console.log('firestore', firestore);

  // 현재 날짜를 YYYY-DD-MM 포맷으로 변환하는 함수
  const nowDate = () => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = ('0' + (1 + dateObj.getMonth())).slice(-2);
    let day = ('0' + dateObj.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  // Firestore에 내용 입력
  const memberWrite = async (p_collection, p_id, p_pass, p_name) => {
    /**
     * Collection은 members로 고정하고, id는 document로 사용한다.
     */
    await setDoc(doc(firestore, p_collection, p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regDate: nowDate(),
    });
    console.log('입력 성공');
    alert('입력에 성공하였습니다.');
  };

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>입력하기</h3>
      <form
        onSubmit={(e) => {
          // submit 이벤트 차단
          e.preventDefault();

          // 입력한 폼값을 target 속성으로 얻어옴
          let collection = e.target.collection.value;
          let id = e.target.id.value;
          let pass = e.target.pass.value;
          let name = e.target.name.value;

          // 빈 값에 대한 폼값 검증
          if (id.trim() === '') {
            alert('아이디를 입력하세요.');
            e.target.id.focus();
            return;
          }
          if (pass.trim() === '') {
            alert('비밀번호를 입력하세요.');
            e.target.pass.focus();
            return;
          }
          if (name.trim() === '') {
            alert('이름을 입력하세요.');
            e.target.name.focus();
            return;
          }
          // 입력값을 인자로 함수 호출
          memberWrite(collection, id, pass, name);

          // 입력 이후 입력란을 공백으로 처리
          e.target.id.value = '';
          e.target.pass.value = '';
          e.target.name.value = '';
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
              <td>아이디</td>
              <td>
                <input type="text" name="id" />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <input type="text" name="pass" />
              </td>
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <input type="text" name="name" />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">입력</button>
      </form>
    </div>
  );
}

export default App;
