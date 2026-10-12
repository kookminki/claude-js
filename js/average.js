// 임의의 이름, 국어 점수, 수학 점수, 영어 점수의 평균 구하기
// ** 중요 ** 값을 모두 변수에 담아보기
const name = "민기"
const korean = 85
const math = 92
const english = 78

const subjectCount = 3
const total = korean + math + english
const average = total / subjectCount

console.log(`${name}님의 국어: ${korean}점, 수학: ${math}점, 영어: ${english}점`)
console.log(`${name}님의 총점: ${total}점, 평균: ${average.toFixed(2)}점`)
