import React from 'react';
import InfoList from './InfoList';
import InfoListNone from './InfoListNone';

export default function View(props) {
  let info = props.info;

  let infoList = info ? <InfoList info={info} /> : <InfoListNone />

  return (
    <div className="view">
      {infoList}
    </div>
  )


  // 아래 코드를 컴포넌트화해서 위 코드로 간단하게 변경

  // if (!info) {
  //   return (
  //     <>
  //       <div className="view">
  //         <ul className="info_list">
  //           <li>albumId : </li>
  //           <li>id : </li>
  //           <li>title : </li>
  //           <li>url : </li>
  //           <li>thumbnailUrl : </li>
  //         </ul>
  //       </div>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     <div className="view">
  //       <ul className="info_list">
  //         <li>albumId : {info.albumId}</li>
  //         <li>id : {info.id}</li>
  //         <li>title : {info.title}</li>
  //         <li>url : {info.url}</li>
  //         <li>thumbnailUrl : {info.thumbnailUrl}</li>
  //       </ul>
  //     </div>
  //   </>
  // );
}
