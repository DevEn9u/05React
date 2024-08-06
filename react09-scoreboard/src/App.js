import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import AddPlayerForm from './components/AddPlayerForm';
import Player from './components/Player';

function App() {
  // 데이터로 사용할 객체형배열을 State로 정의
  const [playerData, setPlayerData] = useState([
    { idx: 1, name: '홍길동', score: 10 },
    { idx: 2, name: '손오공', score: 20 },
    { idx: 3, name: '유비', score: 30 },
    { idx: 4, name: '달타냥', score: 40 },
  ]);
  // 시퀀스로 사용할 State 생성
  const [nextVal, setNextVal] = useState(5);

  // 플레이어를 추가하기 위한 함수 정의
  const addPlayerProcess = (pName) => {
    // 매개변수를 통해 플레이어의 이름을 받음
    console.log('onAddPlayer', pName);
    // 추가할 객체 생성
    let addPlayer = { idx: nextVal, name: pName, score: 0 };

    // 추가 후 화면이 리렌더링 됨
    // 데이터 복사본 배열 생성
    let copyPlayers = [...playerData];
    // 복사본에 데이터 추가
    copyPlayers.push(addPlayer);
    // State를 변경한다.
    setPlayerData(copyPlayers);

    /*
    위와 같이 배열의 복사본을 만든 후 데이터를 추가하고 State를 변경하면
    React가 변화를 갑지하고 새롭게 렌더링을 하게된다.
    하지만 아래와 같이 원본데이터를 변경하면 변화를 감지하지 못하므로
    렌더링이 되지 않게 된다.
    이처럼 객체형 데이터는 항상 복사본을 생성하여 새로운 참조값을 통해 변화를
    감지할 수 있게 처리해야된다.
    */

    // 데이터가 추가되지만 리렌더링 되지 않음
    // 원본 데이터에 새로운 객체를 추가
    // playerData.push(addPlayer);
    // // 원본 데이터를 통해 State를 변경
    // setPlayerData(playerData);
    // console.log(playerData);

    // 새로운 데이터 추가를 위해 시퀀스 증가
    setNextVal(nextVal + 1);
  };

  // 플레이어의 점수 변경
  const scoreChangeProcess = (flag, playerIdx) => {
    // 플레이어의 일련번호와 증감 flag
    console.log('idx', playerIdx, 'flag', flag);
    // 데이터의 복사본 배열 생성
    let copyPlayers = [...playerData];
    // 반환값이 없는 forEach함수로 반복
    copyPlayers.forEach((row) => {
      // console.log(row.idx, row.name);
      // 점수변경을 위한 플레이어 검색
      if (row.idx === playerIdx) {
        console.log(row.name);
        // 플레그에 따라 5점씩 증감
        if (flag === '+') row.score += 5;
        else row.score -= 5;

        // 점수는 음수가 될 수 없으므로 0점으로 고정함.
        if (row.score < 0) {
          alert('최소 점수는 0점입니다.');
          row.score = 0;
        }
      }
    });
    // 복사본을 통해 State 변경
    setPlayerData(copyPlayers);
  };

  // 플레이어 삭제
  const deletePlayerProcess = (playerIdx) => {
    // 플레이어의 일련번호
    console.log('삭제 idx: ', playerIdx);
    // 데이터의 복사본 배열 생성
    let newPlayerData = playerData.reduce((prev, curr) => {
      if (curr.idx !== playerIdx) {
        prev.push(curr);
      }
      return prev;
    }, []);

    setPlayerData(newPlayerData);
  };

  // 플레이어 이름 변경
  const editPlayerProcess = (idx, name) => {
    console.log('수정', idx, name);
    let newPlayerData = playerData.filter((row) => {
      if (row.idx === idx) {
        row.name = name;
      }
      return row;
    });
    setPlayerData(newPlayerData);
  };

  return (
    <div className="scoreboard">
      <Header title="My Scoreboard" playersData={playerData} />
      {/* JSX에 중괄호를 사용해서 map함수를 직접 구현. 데이터의 개수만큼
      반복해서 <Player> 컴포넌트를 반복 렌더링 한다. */}
      {playerData.map((playerRow) => (
        <Player
          playerData={playerRow}
          key={playerRow.idx}
          onChangeScore={scoreChangeProcess}
          onDeletePlayer={deletePlayerProcess}
          onEditPlayer={editPlayerProcess}
        />
      ))}
      <AddPlayerForm onAddPlayer={addPlayerProcess}></AddPlayerForm>
    </div>
  );
}

export default App;
