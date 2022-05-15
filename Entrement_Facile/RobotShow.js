const L = parseInt(readline());
const N = parseInt(readline());

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
      listBots[i].p++;
    } else {
      listBots[i].p--;
    }
    if (listBots[i].p > L || listBots[i].p < 0) {
      listBots.splice(i, 1);
      i--;
    }

    changeDirectionCollision();
  }
}

let direction = "R";
var inputs = readline().split(" ");
for (let i = 0; i < N; i++) {
  const b = parseInt(inputs[i]);
  listBots.push({ p: b, d: direction });
  direction = direction === "R" ? "L" : "R";
}
let count = 0;
//listBots.sort((a, b) => a.position - b.position);
//console.error(listBots);
while (listBots.length > 0) {
  goUp();
  console.error(...listBots, "passe");
  count++;
}
console.log(count);
