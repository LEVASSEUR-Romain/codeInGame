const n = readline();
let arrayNumber = (parseInt(n) + 1).toString().split("");
const arrayLength = arrayNumber.length;
for (let i = 0; i < arrayNumber.length; i++) {
  if (arrayNumber[i] < arrayNumber[i - 1]) {
    arrayNumber[i] = arrayNumber[i - 1];
    arrayNumber = arrayNumber.slice(0, i + 1);
    break;
  }
}
while (arrayNumber.length !== arrayLength) {
  arrayNumber.push(arrayNumber[arrayNumber.length - 1]);
}
console.log(arrayNumber.join(""));
