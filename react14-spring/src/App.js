/*
 * HashRouter 
 - <BrowserRouter>와 동일한 역할의 컴포넌트로 라우팅 처리를 위한
 컴포넌트 매핑에 사용됨
 - 사용시 URL에 '#'이 들어감
 ex) http://localhost:3000/#/view/339
 * Route, Routes
 - 라우터 처리를 위해 사용됨
*/
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MyList from './components/MyList';
import MyView from './components/MyView';
import MyWrite from './components/MyWrite';

/* 공통 Link로 사용할 Component. 차후 Spring Boot Project로 배포하면
   React로 만든 페이지와 Spring에서 만든 페이지를 자유롭게 이동 가능하다. */
const TopNavi = () => {
  return (
    <nav>
      <table border="1" width="90%">
        <tbody>
          <tr>
            <td style={{ textAlign: 'center' }}>
              <a href="/">Main</a> |&nbsp;
              <a href="/crud/index.html">React CRUD</a> |&nbsp;
              <a href="/boardList.do">Spring Board</a> |&nbsp;
              <a href="/rboard/index.html">React Board</a>
            </td>
          </tr>
        </tbody>
      </table>
    </nav>
  );
};
function App() {
  return (
    <HashRouter>
      <div className="App">
        <TopNavi />
        <Routes>
          <Route path="" element={<MyList />} />
          <Route path="/list" element={<MyList />} />
          <Route path="/view">
            <Route path=":num" element={<MyView />} />
          </Route>
          <Route path="/write" element={<MyWrite />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
