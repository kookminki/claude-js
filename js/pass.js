let name = "홍길동"
let korean = 85
let math = 70
let english = 60

let average = (korean + math + english) / 3

console.log("이름: " + name)
console.log("평균: " + average.toFixed(2))

if (average >= 60) {
    console.log("합격")
} else {
    console.log("불합격")
}
