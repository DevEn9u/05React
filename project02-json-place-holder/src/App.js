import { useState } from 'react';
import './App.css';
import List from './components/List';
import View from './components/View';

function App() {
  // View에서 받을 정보
  const [info, setInfo] = useState(null);
  // List에서 photo/title 클릭시 View로 정보를 보냄
  const sendInfo = (info) => {
    setInfo(info);
  }

  return (
    <div className="App">
      <main id="container">
        <h2>연락처 API 연동하기</h2>
        <div className="main_wrap">
          <List sendInfo={sendInfo}/>
          <View info={info} />
        </div>
      </main>
    </div>
  );
}

export default App;
