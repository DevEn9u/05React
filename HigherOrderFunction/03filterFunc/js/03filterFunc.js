/**
 filter() 함수
 - filter라는 명칭과 같이 콜백함수의 조건에 해당하는 요소만 반환하여 새로운 배열을 만들 때 사용한다.
 - map()과 형식은 동일하고, 반환값에 대한 차이만 있다.
 */
function filterTest1() {
  console.error('filterTest1() called.. 기본 사용법 - 조건에 맞는 elment만 추출');
  let oldArray = [1, 2, 3, 4, 5];
  let newArray = oldArray.filter(function (currentVal) {
    console.log('현재요소', currentVal);
    /* map()과 동일하게 배열의 크기만큼 반복하지만, 3 이하인 값만 반환하여 새로운 배열에 저장한다. */
    return currentVal <= 3;
  });
  console.log(newArray);
}

function filterTest2() {
  console.error('filterTest2() called.. JSON 객체형배열 사용 및 검색');
  // 객체형 배열 선언
  let oldJsonArray = [
    { name: '혜빈', salary: 100000 },
    { name: '제인', salary: 200000 },
    { name: '나윤', salary: 300000 },
    { name: '주이', salary: 400000 },
    { name: '아인', salary: 500000 },
    { name: '낸시', salary: 600000 },
  ];
  /* salary가 300000 이상인 객체만 추출하여 반환한다. 반환된 값은 새로운 배열에 추가된다. */
  let newJsonArray = oldJsonArray.filter(function (currentVal) {
    return currentVal.salary >= 300000;
  }, undefined);
  // thisArgs는 사용하는 경우가 많지 않다(여기서는 undefined로 표시). 필요하지 않는 경우 생략 가능하다.
  console.log(newJsonArray);
}

function filterTest3() {
  console.error('filterTest3() called.. thisArgs 매개변수 사용하기');
  let oldArray = [1, 2, 3, 4, 5, 50, 100];
  // 콜백함수에서 사용할 인자(객체형) 생성
  let thisArgs = { min: 1, max: 10 };
  // 콜백함수 정의 : 1~10 사이의 값만 반환하여 새로운 배열 생성.
  function getMinMax(value) {
    return value >= this.min && value <= this.max;
  }
  let newArray = oldArray.filter(getMinMax, thisArgs);
  console.log('thisArgs 사용 결과', newArray);
}
