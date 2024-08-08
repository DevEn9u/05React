import './App.css';
import ChatMessage from './components/ChatMessage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatStart from './components/ChatStart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<ChatStart />} />
            <Route path="talk" element={<ChatMessage />} />
          </Route>
          {/* <Route path='/' element={<ChatMessage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
