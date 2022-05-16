let tblGame = [];
function lookAdjacent(x, y) {
  let count = 0;
  if (tblGame[y]?.[x + 1] && tblGame[y]?.[x + 1] !== "#") count++;
  if (tblGame[y]?.[x - 1] && tblGame[y]?.[x - 1] !== "#") count++;
  if (tblGame[y + 1]?.[x] && tblGame[y + 1]?.[x] !== "#") count++;
  if (tblGame[y - 1]?.[x] && tblGame[y - 1]?.[x] !== "#") count++;
  return count;
}
var inputs = readline().split(" ");
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
for (let i = 0; i < height; i++) {
  const line = readline();
  tblGame.push(line.split(""));
}
for (let y = 0; y < tblGame.length; y++) {
  for (let x = 0; x < tblGame[y].length; x++) {
    if (tblGame[y][x] === "0") {
      tblGame[y][x] = lookAdjacent(x, y);
    }
  }
}

for (let i = 0; i < tblGame.length; i++) {
  console.log(tblGame[i].join(""));
}
