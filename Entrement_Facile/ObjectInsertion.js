const symbol = [];
let grill = [];
const tblSymbol = [];
let saveOne = { x: 0, y: 0 };
function stockSymbol() {
  let initialX;
  let initialY;
  for (let y = 0; y < tblSymbol.length; y++) {
    for (let x = 0; x < tblSymbol[y].length; x++) {
      if (tblSymbol[y][x] === "*") {
        if (initialX === undefined && initialY === undefined) {
          initialX = x;
          initialY = y;
          symbol.push([0, 0]);
        } else {
          symbol.push([x - initialX, y - initialY]);
        }
      }
    }
  }
}
function tchekSymbolIntoGrill() {
  let possibility = 0;
  let valide = false;
  for (let y = 0; y < grill.length; y++) {
    for (let x = 0; x < grill[y].length; x++) {
      if (grill[y][x] === ".") {
        valide = false;
        const val = symbol.every(([sX, sY]) => {
          if (grill[y + sY]?.[x + sX] && grill[y + sY]?.[x + sX] === ".") {
            return true;
          } else {
            return false;
          }
        });
        if (val) {
          saveOne.x = x;
          saveOne.y = y;
          possibility++;
        }
      }
    }
  }
  return possibility;
}
function updateGrill() {
  symbol.forEach(([sX, sY]) => {
    grill[saveOne.y + sY][saveOne.x + sX] = "*";
  });
}

var inputs = readline().split(" ");
const a = parseInt(inputs[0]);
const b = parseInt(inputs[1]);

for (let i = 0; i < a; i++) {
  const objectLine = readline();
  tblSymbol.push(objectLine.split(""));
}
var inputs = readline().split(" ");
const c = parseInt(inputs[0]);
const d = parseInt(inputs[1]);
for (let i = 0; i < c; i++) {
  const gridLine = readline();
  grill.push(gridLine.split(""));
}
stockSymbol();
const numberPossitility = tchekSymbolIntoGrill();
if (numberPossitility === 1) {
  console.log(1);
  updateGrill();
  grill.forEach((e) => console.log(e.join("")));
} else {
  console.log(tchekSymbolIntoGrill());
}
