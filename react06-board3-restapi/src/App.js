import './App.css';
import { Routes, Route } from 'react-router-dom';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';
import Edit from './components/board/Edit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/list" element={<List />} />
        <Route path="/view" element={<View />}>
          <Route path=':idx' element={<View />}></Route>
        </Route>
        <Route path="/write" element={<Write />} />
        <Route path="/edit" element={<Edit />}>
          <Route path=':idx' element={<Edit />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
