// Firebase에서 생성한 API 정보를 저장해 놓은 파일

// Firebase 초기화, 사용을 위한 함수 import
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 본인의 API Key와 관련 정보(.env 파일 생성 전)
// const firebaseConfig = {
//   apiKey: "AIzaSyDyaLFlPHbBWrPZSm64GUkd-Q6BghLq1jQ",
//   authDomain: "reactapp202408-a22c0.firebaseapp.com",
//   projectId: "reactapp202408-a22c0",
//   storageBucket: "reactapp202408-a22c0.appspot.com",
//   messagingSenderId: "820540525174",
//   appId: "1:820540525174:web:aef69e72805cedbdd5ad57",
//   measurementId: "G-NFERS65X7H"
// };

// ,env 파일생성 후
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Firestore 객체 생성 및 export
const firestore = getFirestore(app) ;
export { firestore };