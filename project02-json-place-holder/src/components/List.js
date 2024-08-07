import React, { useEffect, useState } from 'react';

export default function List(props) {
  let [albumData, setAlbumData] = useState([]);
  let [myPage, setMyPage] = useState(1);

  useEffect(
    function () {
      fetch(`https://jsonplaceholder.typicode.com/albums/${myPage}/photos`)
        .then((response) => response.json())
        .then((json) => {
          // console.log(json);
          setAlbumData(json);
        });
    },
    [myPage]
  );

  let dataList = albumData.map((row) => {
    return (
      <tr key={row.id} className="info_con">
        <td>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              props.sendInfo(row);
            }}
          >
            <img src={row.url} alt={row.id} />
          </a>
        </td>
        <td>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              props.sendInfo(row);
            }}
          >
            {row.title}
          </a>
        </td>
      </tr>
    );
  });

  let optionTag = [];
  for (let i = 1; i <= 100; i++) {
    optionTag.push(<option value={i}>{i}</option>);
  }

  return (
    <>
      <div className="list">
        <select name="page" onChange={(e) => setMyPage(e.target.value)}>
          {optionTag}
        </select>
        <table>
          <tbody>
            <tr>
              <th className="col1">photo</th>
              <th>title</th>
            </tr>
            {dataList}
          </tbody>
        </table>
      </div>
    </>
  );
}
