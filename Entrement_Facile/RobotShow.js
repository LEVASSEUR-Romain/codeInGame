const L = parseInt(readline());
const N = parseInt(readline());
/* 
const listBots = [];
function changeDirectionCollision() {
  for (let i = 0; i < listBots.length; i++) {
    for (let j = i + 1; j < listBots.length; j++) {
      if (listBots[i].p === listBots[j].p) {
        listBots[i].d = listBots[i].d === "R" ? "L" : "R";
        listBots[j].d = listBots[j].d === "R" ? "L" : "R";
      }
    }
  }
}

function goUp() {
  for (let i = 0; i < listBots.length; i++) {
    if (listBots[i].d === "R") {
      listBots[i].preview = listBots[i].p;
      listBots[i].p++;
    } else {
      listBots[i].preview = listBots[i].p;
      listBots[i].p--;
    }
    if (listBots[i].p > L || listBots[i].p < 0) {
      listBots.splice(i, 1);
      i--;
    }
  }
  changeDirectionCollision();
} */

const list = [];
let direction = "R";
var inputs = readline().split(" ");
for (let i = 0; i < N; i++) {
  const b = parseInt(inputs[i]);
  list.push(b);
  //listBots.push({ p: b, d: direction, preview: b });
  //direction = direction === "R" ? "L" : "R";
}
list.sort((a, b) => a - b);
const final = Math.max(L - list[0], list[list.length - 1]);
console.log(final);
/* let count = 0;
while (listBots.length > 0) {
  goUp();
  console.error(...listBots, "passe");
  count++;
} 
console.log(count - 1);
*/
