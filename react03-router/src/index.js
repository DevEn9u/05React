import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
/**
 * 라우터 설정을 위해 최상위 컴포넌트인 <App>을 BrowserRouter 컴포넌트로 감싸준다. 이 설정은 index.js에서 아래와 같이 할 수도 있고, App.js에서 해도 된다.
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
