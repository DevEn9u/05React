import './App.css';
// Firestore 객체 import
import { firestore } from './firestoreConfig';
// 새로운 문서를 입력하거나 읽을 때 사용하는 함수 import
import { doc, setDoc, getDoc } from 'firebase/firestore';

function App() {
  // firestore 연결 확인
  console.log('firestore', firestore);

  // document 추가
  // Korea Collection에 Seoul Document가 생긴다.
  const addMessage = async () => {
    /**
     * Collection(Oracle의 Table과 유사) : Korea
     * Document(Record와 유사) : Seoul
     * 하위 데이터는 JSON 객체 형식으로 작성하면 된다. 따라서 document별로
       데이터의 형식은 서로 다를 수 있다(정형화되어있지 않다).
     */
    await setDoc(doc(firestore, 'Korea', 'Seoul'), {
      gu: '종로구',
      dong: '관철동',
      hotplace: '더조은 IT',
      subway: '종각역',
    });
    console.log('입력성공');
  };

  // document 읽기
  const getMessage = async () => {
    // 입력된 collection과 document를 통해 문서의 참조값을 얻어온다.
    const docRef = doc(firestore, 'Korea', 'Seoul');
    const docSnap = await getDoc(docRef);
    // 해당 document가 존재한다면 console에 내용 출력
    if (docSnap.exists()) {
      console.log('Document data : ', docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>Firebaas 연결</h3>
      <button type="button" onClick={addMessage}>
        입력
      </button>
      <button type="button" onClick={getMessage}>
        읽기
      </button>
    </div>
  );
}

export default App;
