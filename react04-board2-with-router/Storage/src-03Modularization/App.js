import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/list' element={<List />} />
          <Route path='/view' element={<View />} />
          <Route path='/write' element={<Write />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
