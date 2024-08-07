import React, { useEffect, useState } from 'react';

export default function List(props) {
  let [albumData, setAlbumData] = useState([]);

  useEffect(function () {
    fetch('https://jsonplaceholder.typicode.com/albums/100/photos')
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setAlbumData(json);
      });
  }, []);

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

  return (
    <>
      <div className="list">
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
