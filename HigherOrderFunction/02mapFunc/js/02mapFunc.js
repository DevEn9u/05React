/**
 map() 함수
 - 콜백 함수를 실행한 결과를 통해 새로운 배열을 만들때 사용한다.
 - 나머지 사용법은 forEach()와 동일하다.
 - 호출한 배열의 크기가 N이라면 N개의 인자 전체가 반환된다.
 */
function mapTest1() {
  console.error('mapTest1() called.. 기본 사용법');
  let oldArray = [1, 2, 3, 4, 5];
  let newArray = oldArray.map(function(currentVal, index, array) {
    /* 콜백함수의 매개변수는 순서대로 현재값, 인덱스, 호출한 배열을 받을 수 있다. */
    console.log(currentVal, index, array);
    // 현재 루프의 각 요소에 2를 곱한 결과를 반환한다.
    return currentVal * 2;
  });
  // 콜백함수의 반환값이 순서대로 새로운 배열에 저장된다.
  console.log(newArray);
}

function mapTest2() {
  console.error('mapTest2() called.. JSON객체 배열 활용하기');
  // 객체를 요소로 가진 객체(DTO)형 배열 선언
  let oldJSON = [
    { name: '이건', salary: 50000000 },
    { name: '홍길동', salary: 1000000 },
    { name: '임신구', salary: 3000000 },
    { name: '이승룡', salary: 2000000 },
  ];

  let newJSON = oldJSON.map(function (currentVal) {
    // 빈 객체 생성
    let returnObj = {};
    // 각 루프에서 반환하는 객체의 name과 salary를 이용해서 새로운 객체 생성
    returnObj[currentVal.name] = currentVal.salary;
    // 해당 객체는 {이건 : 50000000} 과 같이 생성됨
    return returnObj;
  });
  console.log(newJSON);
}

function mapTest3() {
  console.error('mapTest3() called.. 화살표 함수 사용하기');
  let oldArray = [1, 2, 3, 4, 5];
  // 현재 루프의 요소를 제곱한 결과를 반환하여 새로운 배열로 생성
  let newArray = oldArray.map((num) => {
    return Math.pow(num, 2);
  });
  console.log(newArray);
}
