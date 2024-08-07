import { useEffect, useState } from 'react';
import './App.css';

const ListTop = (props) => {
  let [myList, setMyList] = useState([]);
  let [myPage, setMyPage] = useState(1);

  useEffect(function () {
    fetch('https://jsonplaceholder.typicode.com/albums/100/photos')
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setMyList(json);
      });
    return () => {
      console.log('#Life', 'LifeGood ==> 4. useEffect실행2');
    };
  }, [myPage]);

  let listTag = [];
  for (let i = 0; i < myList.length; i++) {
    let data = myList[i];
    listTag.push(
      <tr key={data.id}>
        <td>
          <img src={data.url} alt="{data.title}" width="80px" />
        </td>
        <td>
          <a
            href="/"
            data-id={data.id}
            onClick={(e) => {
              e.preventDefault();
              props.myLinkClick(e.target.dataset.id);
            }}
          >
            {data.title}
          </a>
        </td>
      </tr>
    );
  }
  console.log('#Life', 'LifeGood => 2. return실행');

  let optionTag = [];
  for (let i = 1; i <= 100; i++) {
    optionTag.push(<option value={i}>{i}</option>);
  }

  return (
    <div id="contactList">
      <select name="page" onChange={(e) => setMyPage(e.target.value)}>
        {optionTag}
      </select>
      <table border="1" className="table table-bordered table striped">
        <colgroup>
          <col width="20%" />
          <col width="*" />
        </colgroup>
        <thead>
          <tr className="text-center">
            <th>photo</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>{listTag}</tbody>
      </table>
    </div>
  );
};

const ContentBody = (props) => {
  return (
    <div id="contactView">
      <h2>{props.myResult.name}</h2>
      <ul className="list-group list-group-flush list-hover">
        <li className="list-group-item list-group-item-action">
          albumId : {props.myResult.albumId}
        </li>
        <li className="list-group-item list-group-item-action">
          id : {props.myResult.id}
        </li>
        <li className="list-group-item list-group-item-action">
          title : {props.myResult.title}
        </li>
        <li className="list-group-item list-group-item-action">
          url : {props.myResult.url}
        </li>
        <li className="list-group-item list-group-item-action">
          thumbnail :{' '}
          <img
            src={props.myResult.thumbnailUrl}
            alt='{props.myResult.title}'
            className="myImg"
          />
        </li>
      </ul>
    </div>
  );
};

function App() {
  let [myResult, setMyResult] = useState({});

  return (
    <div className="container">
      <h2>연락처 API 연동하기</h2>
      <div className="row">
        <div className="list col-sm-6">
          <ListTop
            myLinkClick={(no) => {
              console.log('클릭', no);
              fetch('https://jsonplaceholder.typicode.com//photos/' + no)
                .then((result) => result.json())
                .then((json) => {
                  // console.log(json);
                  setMyResult(json);
                });
            }}
          />
        </div>
        <div className="col-sm-6">
          <ContentBody myResult={myResult} />
        </div>
      </div>
    </div>
  );
}

export default App;
