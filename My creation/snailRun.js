// links https://www.codingame.com/contribute/view/183307aa03c47b356b9fbfbffd20bbbe83ea9
const numberSnails = parseInt(readline());
const snails = [];
const out = [];
function outNextTo(snail) {
  let r = 0;
  for (let i = 0; i < out.length; i++) {
    const calcul = Math.abs(snail.x - out[i].x) + Math.abs(snail.y - out[i].y);
    if (r === 0) r = calcul;
    if (r > calcul) r = calcul;
  }
  return r;
}

for (let i = 0; i < numberSnails; i++) {
  const speedSnail = parseInt(readline());
  snails.push({ id: i + 1, speed: speedSnail });
}
const mapHeight = parseInt(readline());
const mapWidth = parseInt(readline());
for (let i = 0; i < mapHeight; i++) {
  const ROW = readline().split("");
  for (let j = 0; j < ROW.length; j++) {
    if (ROW[j] === "#") out.push({ x: j, y: i });
    if (ROW[j].match(/[1-9]/)) {
      const change = snails.find((s) => s.id === parseInt(ROW[j]));
      change.x = j;
      change.y = i;
    }
  }
}
snails.forEach((s) => {
  s.out = outNextTo(s);
});

let winner;
while (winner === undefined) {
  snails.forEach((s) => {
    s.out = s.out - s.speed;
    if (s.out <= 0) {
      winner = s.id;
    }
  });
}
console.log(winner);
