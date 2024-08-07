import React from 'react';

export default function InfoList(props) {
  let info = props.info;

  // if (!info) {
  //   return (
  //     <>
  //       <ul className="info_list">
  //         <li>albumId : </li>
  //         <li>id : </li>
  //         <li>title : </li>
  //         <li>url : </li>
  //         <li>thumbnailUrl : </li>
  //       </ul>
  //     </>
  //   );
  // }
  return (
    <>
      <ul className="info_list">
        <li>albumId : {info.albumId}</li>
        <li>id : {info.id}</li>
        <li>title : {info.title}</li>
        <li>url : {info.url}</li>
        <li className='thumbnail'>
          thumbnailUrl : <img src={info.thumbnailUrl} alt={info.thumbnailUrl} />
        </li>
      </ul>
    </>
  );
}
