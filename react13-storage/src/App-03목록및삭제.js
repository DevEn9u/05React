import { deleteObject, getDownloadURL, listAll, ref } from 'firebase/storage';
import './App.css';
import { storage } from './storageConfig';
import { useEffect, useState } from 'react';

function App() {
  // storage 연결 및 참조(ref) 생성
  const listRef = ref(storage, '');

  // State : 파일목록, 삭제 후 렌더링을 위한 변수
  const [fileLists, setFileLists] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);

  useEffect(() => {
    let fileRows = [];
    // 생성된 참조에서 모든 폴더와 파일명 인출
    listAll(listRef)
      .then((res) => {
        // 폴더명 출력
        res.prefixes.forEach((folderRef) => {
          console.log('폴더', folderRef);
        });
        // 이미지 출력
        res.items.forEach((itemRef) => {
          // 이미지 삭제를 위한 참조를 얻어온다
          const deleteRef = ref(storage, itemRef.fullPath);

          // 파일의 다운로드 URL을 비동기로 가져온다. 파일명으로 통해 참조를 생성한다.
          getDownloadURL(ref(storage, itemRef.name))
            .then((url) => {
              console.log('파일 URL 다운로드');
              // <img>에 부여된 id를 통해 DOM을 얻어온다
              const img = document.getElementById(`img_${itemRef.name}`);
              // <img>의 src, width 속성과 값을 부여
              img.setAttribute('src', url);
              img.setAttribute('width', 200);
            })
            .catch((err) => {
              console.log('이미지 다운로드 중 에러', err);
            });

          // 파일 목록 추가
          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td>{itemRef.name}</td>
              <td>
                <img alt={itemRef.name} id={`img_${itemRef.name}`} />
              </td>
              <td>
                <button type="button" onClick={() => {
                  if (window.confirm('삭제할까요?')) {
                    // 삭제를 위한 참조값을 통해 삭제 처리
                    deleteObject(deleteRef).then(() => {
                      console.log('파일 삭제 성공');
                      setRenderFlag(!renderFlag);
                    })
                    .catch((err) => {
                      console.log('파일 삭제 실패', err);
                    });
                  }
                }}>삭제</button>
              </td>
            </tr>
          );
        });
        // 파일 목록을 얻어온 후 State 변경
        setFileLists(fileRows);
      })
      .catch((err) => {
        console.log('파일 삭제중 에러 발생', err);
      });
  }, [renderFlag]);
  /**
   * 파일 삭제가 완료된 후 renderFlag를 변경하면 새롭게 렌더링되면서
     useEffect가 재실행되어 목록을 새롭게 가져온다.
   */

  console.log('렌더링');

  return (
    <div className="App">
      <h2>Firebase - storageApp</h2>
      <h3>파일 목록 및 삭제</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>bucket</th>
            <th>fullPath</th>
            <th>name</th>
            <th>image</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>{fileLists}</tbody>
      </table>
    </div>
  );
}

export default App;
