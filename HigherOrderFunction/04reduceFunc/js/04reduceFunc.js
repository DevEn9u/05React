/**
 reduce() 함수
 - 배열을 순회하면서 요소의 값을 하나의 값으로 줄여서 반환한다.
 - 즉 반환값은 있으나 배열이 아니라 하나의 결과값만 반환한다.
 - 배열의 크기가 N일 때
    초기값이 있으면 N회차 반복
    초기값이 없으면 N-1회차 반복
 - 앞에서 사용한 고차함수와 다른 점은 콜백함수의 매개변수가 4개라는 점이다.
 */

// 콜백함수에서 사용할 초기값이 없고, 반환값도 없는 상태
(function reduceTest1() {
  console.error('reduceTest1() called.. 기본사용법');
  let oldArray = [0, 1, 2, 3, 4];
  oldArray.reduce(function (previousVal, currentVal, index, array) {
    /* 초기값이 없으므로 배열의 첫번째 요소가 prev에 할당된다.
    따라서 curr은 두번째 요소인 1이 할당된다.
    반환값이 없으므로 두번째 prev부터는 undefined가 된다. 
    previousVal : 0, undefined ...
    currentVal : 1, 2, 3, 4
    */
    console.log(previousVal, currentVal, index);
  });
})();
// 이와같이 함수를 소괄호로 묶어주면 선언과 동시에 호출된다(즉시실행함수 IIFE - Immediately Invoked Function Expression).

// 콜백함수에서 사용할 초기값은 없지만 반환값은 있는 상태
function reduceTest2() {
  console.error('reduceTest2() called.. return 값 사용하기');
  let oldArray = [0, 1, 2, 3, 4];
  let sum = oldArray.reduce(function (previousVal, currentVal) {
    /* 초기값이 없으므로 prev는 배열의 첫번째 값을 할당받는다.
    이전 루프의 반환값이 다음 루프의 prev의 값이 된다.
    previousVal : 0, 1, 3, 6
    currentVal : 1, 2, 3, 4  => 모든 반복 완료시 10(최종 return)
    */
    console.log(previousVal, currentVal);
    return previousVal + currentVal;
  });
  console.log(sum);
}

// 콜백함수에서 사용할 초기값(2), 반환값이 모두 존재하는 상태
function reduceTest3() {
  console.error('reduceTest3() called.. 초기값 사용하기');
  let oldArray = [0, 1, 2, 3, 4];
  let sum = oldArray.reduce(function (previousVal, currentVal) {
    /* 초기값 2가 주어졌으므로 prev의 첫번째 값은 2가 된다.
    따라서 curr의 첫번째 값은 0이 되고 반복횟수는 5회가 된다.
    previousVal : 2, 2, 3, 5, 8
    currentVal : 0, 1, 2, 3, 4  => 모든 반복 완료시 12(최종 return) */
    console.log(previousVal, currentVal);
    return previousVal + currentVal;
  }, 2);
  console.log(sum);
}

// 콜백함수에서 사용할 초기값(빈 배열), 반환값이 모두 존재하는 상태
function reduceTest4() {
  console.error('reduceTest4() called.. 배열엣허 중복값을 제거하는 함수 구현');
  let oldArray = [0, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6];
  /* 초기값으로 빈 배열이 주어졌기 때문에 prev의 첫번째 값은 []이 된다. 배열의 크기만큼 N회차 반복된다.
  previousVal : [], [0], [0, 1], ...
  currentVal :  0,   1,    2, ...  
  위와 같이 반복되다가 검색한 원소가 있다면 false가 되므로 배열에 추가되지 않는다. 즉 중복이 제거된 상태의 배열이 최종 반환된다. */
  let newArray = oldArray.reduce(function (previousVal, currentVal) {
    // indexOf()를 이용해 배열에서 특정 원소를 찾지 못한 경우 -1이 반환된다.
    if (previousVal.indexOf(currentVal) < 0) {
      previousVal.push(currentVal);
    }
    return previousVal;
  }, []);
  console.log(newArray);
}
