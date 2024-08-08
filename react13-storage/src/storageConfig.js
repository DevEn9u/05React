import { initializeApp } from "firebase/app";
// Realtime Database import
import { getStorage } from "firebase/storage";

// .env 파일생성 후
/**
 * Realtime Database는 API Key 이외의 databaseURL이 하나 더 필요하다.
 * console 상단에서 확인 가능하다.
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// App을 초기화하고 Realtime을 사용할 준비를 한다.
const app = initializeApp(firebaseConfig);
/** Storage의 참조를 얻어올 때는 아래와 같이 참조 URL이 설정되어야 한다. */
const storage = getStorage(app, "gs://reactapp202408-a22c0.appspot.com");

export { storage };