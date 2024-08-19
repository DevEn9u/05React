/**
 forEach() 함수
 - array의 크기(n)만큼 반복하여 콜백함수를 호출
 - thisArgs는 콜백함수 내에서 인수로 사용할 수 있다. this.xx와 같이 사용한다. 단 필요없는 경우에는 생략이 가능하다.
 - 반환값은 없다.
 형식]
  배열변수.forEach(콜백함수(), thisArgs);
  or
  배열변수.forEach((), thisArgs => {})
 */

function forEachTest1() {
  console.error('forEachTest!1() called..기본사용법');
  let oldArray = [1, 2, 3, 4, 5];
  /*
  currentVal : 현재 루프의 원소를 반환
  index : 인덱스를 반환, 0부터 시작
  array : 반복을 위한 배열 자체를 반환
  */
  oldArray.forEach((currentVal, index, array) => {
    console.log('현재값: ' + currentVal, '인덱스: ' + index, '배열: ' + array);
  });
}

function forEachTest2() {
  console.error('forEachTest2() called.. 배열 요소의 합계');
  let oldArray = [1, 2, 3, 4, 5];
  let sum = 0;
  /* forEach 함수 내에서 사용할 콜백함수를 별도로 선언한다. 메개변수는 3개를 사용할 수 있지만, 필요없는 경우 생략할 수 있다. */
  function getSum(currentVal) {
    sum += currentVal;
  }
  oldArray.forEach(getSum);
  // 1~5까지의 수의 합을 출력한다.
  console.log(sum);
}

function forEachTest3() {
  console.error('forEachTest3() called.. 매개변수 사용하기 ');
  let oldArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let sum = 0;
  // 콜백함수에서 사용할 인자(thisArgs)를 객체로 정의
  let myArgs = { min: 3, max: 7 };
  // 콜백함수 getSum 정의
  function getSum(currentVal) {
    /* myArgs는 'this.키'와 같은 형태로 사용할 수있다. 즉 3 이상 7 이하의 조건에 맞는 숫자만 sum에 누적해서 더한다. */
    if (currentVal >= this.min && currentVal <= this.max) {
      sum += currentVal;
    }
  }
  oldArray.forEach(getSum, myArgs);
  console.log(sum);
}
