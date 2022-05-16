const deplacement = {
  "<": "L",
  ">": "R",
  "^": "U",
  v: "D",
};
let tblMap = [];
let strat = {
  x: -1,
  y: -1,
  mouvement: "",
};
function findMove(y, line) {
  for (let i in deplacement) {
    if (line.indexOf(i) != -1) {
      strat.x = line.indexOf(i);
      strat.y = y;
      strat.mouvement = deplacement[i];
    }
  }
}
function paternR(pika) {
  const x = pika.x;
  const y = pika.y;
  // right
  if (tblMap[y]?.[x + 1] && tblMap[y]?.[x + 1] !== "#") pika.x++;
  // down
  else if (tblMap[y + 1]?.[x] && tblMap[y + 1]?.[x] !== "#") pika.y++;
  //up
  else if (tblMap[y - 1]?.[x] && tblMap[y - 1]?.[x] !== "#") pika.y--;
  //left
  else if (tblMap[y]?.[x - 1] && tblMap[y]?.[x - 1] !== "#") pika.x--;
}
function paternL(pika) {
  const x = pika.x;
  const y = pika.y;
  //right
  if (tblMap[y]?.[x + 1] && tblMap[y]?.[x + 1] !== "#") pika.x++;
  //up
  else if (tblMap[y - 1]?.[x] && tblMap[y - 1]?.[x] !== "#") pika.y--;
  // down
  else if (tblMap[y + 1]?.[x] && tblMap[y + 1]?.[x] !== "#") pika.y++;
  // left
  else if (tblMap[y]?.[x - 1] && tblMap[y]?.[x - 1] !== "#") pika.x--;
}

var inputs = readline().split(" ");
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
for (let i = 0; i < height; i++) {
  const line = readline();
  if (strat.x === -1 && strat.y === -1) {
    findMove(i, line);
  }
  tblMap.push(line.split(""));
}
const side = readline();
let positionPika = {
  x: strat.x,
  y: strat.y,
  mouvement: strat.mouvement,
};
// parcout pikachu
while (true) {
  if (positionPika.mouvement !== "") {
    tblMap[positionPika.y][positionPika.x] = "1";
    if (positionPika.mouvement === "L") positionPika.x--;
    else if (positionPika.mouvement === "R") positionPika.x++;
    else if (positionPika.mouvement === "U") positionPika.y--;
    else positionPika.y++;
    positionPika.mouvement = "";
    console.error(positionPika);
  } else {
    tblMap[positionPika.y][positionPika.x] =
      tblMap[positionPika.y][positionPika.x] === "."
        ? 1
        : tblMap[positionPika.y][positionPika.x] + 1;
    if (side === "R") paternR(positionPika);
    else paternL(positionPika);
  }
  console.error(positionPika);
  if (positionPika.x === strat.x && positionPika.y === strat.y) {
    break;
  }
}

for (let i = 0; i < tblMap.length; i++) {
  console.log(tblMap[i].join(""));
}
