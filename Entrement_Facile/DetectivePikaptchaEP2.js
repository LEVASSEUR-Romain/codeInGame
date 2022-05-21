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
function up(x, y, pika) {
  if (tblMap[y - 1]?.[x] && tblMap[y - 1]?.[x] !== "#") {
    pika.y--;
    return true;
  }
  return false;
}
function down(x, y, pika) {
  if (tblMap[y + 1]?.[x] && tblMap[y + 1]?.[x] !== "#") {
    pika.y++;
    return true;
  }
  return false;
}
function left(x, y, pika) {
  if (tblMap[y]?.[x - 1] && tblMap[y]?.[x - 1] !== "#") {
    pika.x--;
    return true;
  }
  return false;
}
function right(x, y, pika) {
  if (tblMap[y]?.[x + 1] && tblMap[y]?.[x + 1] !== "#") {
    pika.x++;
    return true;
  }
  return false;
}
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
  if (pika.direction === "R") {
    if (down(x, y, pika)) pika.direction = "D";
    else if (right(x, y, pika)) pika.direction = "R";
    else if (up(x, y, pika)) pika.direction = "U";
    else if (left(x, y, pika)) pika.direction = "L";
  } else if (pika.direction === "D") {
    if (left(x, y, pika)) pika.direction = "L";
    else if (down(x, y, pika)) pika.direction = "D";
    else if (right(x, y, pika)) pika.direction = "R";
    else if (up(x, y, pika)) pika.direction = "U";
  } else if (pika.direction === "U") {
    if (right(x, y, pika)) pika.direction = "R";
    else if (up(x, y, pika)) pika.direction = "U";
    else if (left(x, y, pika)) pika.direction = "L";
    else if (down(x, y, pika)) pika.direction = "D";
  } else if (pika.direction === "L") {
    if (up(x, y, pika)) pika.direction = "U";
    else if (left(x, y, pika)) pika.direction = "L";
    else if (down(x, y, pika)) pika.direction = "D";
    else if (right(x, y, pika)) pika.direction = "R";
  }
}
function paternL(pika) {
  const x = pika.x;
  const y = pika.y;
  if (pika.direction === "R") {
    if (up(x, y, pika)) pika.direction = "U";
    else if (right(x, y, pika)) pika.direction = "R";
    else if (down(x, y, pika)) pika.direction = "D";
    else if (left(x, y, pika)) pika.direction = "L";
  } else if (pika.direction === "D") {
    if (right(x, y, pika)) pika.direction = "R";
    else if (down(x, y, pika)) pika.direction = "D";
    else if (left(x, y, pika)) pika.direction = "L";
    else if (up(x, y, pika)) pika.direction = "U";
  } else if (pika.direction === "U") {
    if (left(x, y, pika)) pika.direction = "L";
    else if (up(x, y, pika)) pika.direction = "U";
    else if (right(x, y, pika)) pika.direction = "R";
    else if (down(x, y, pika)) pika.direction = "D";
  } else if (pika.direction === "L") {
    if (down(x, y, pika)) pika.direction = "D";
    else if (left(x, y, pika)) pika.direction = "L";
    else if (up(x, y, pika)) pika.direction = "U";
    else if (right(x, y, pika)) pika.direction = "R";
  }
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
  direction: strat.mouvement,
};
let condition = 1;
// parcout pikachu
while (true) {
  if (condition === 1) {
    if (
      (tblMap[positionPika.y]?.[positionPika.x + 1] === undefined ||
        tblMap[positionPika.y]?.[positionPika.x + 1] === "#") &&
      (tblMap[positionPika.y]?.[positionPika.x - 1] === undefined ||
        tblMap[positionPika.y]?.[positionPika.x - 1] === "#") &&
      (tblMap[positionPika.y + 1]?.[positionPika.x] === undefined ||
        tblMap[positionPika.y + 1]?.[positionPika.x] === "#") &&
      (tblMap[positionPika.y - 1]?.[positionPika.x] === undefined ||
        tblMap[positionPika.y - 1]?.[positionPika.x] === "#")
    ) {
      tblMap[positionPika.y][positionPika.x] = 0;
      condition = 3;
      break;
    }
    condition = 2;
  } else {
    if (condition === 2) {
      tblMap[positionPika.y][positionPika.x] = 1;
      condition = 3;
    } else
      tblMap[positionPika.y][positionPika.x] =
        tblMap[positionPika.y][positionPika.x] === "."
          ? 1
          : parseInt(tblMap[positionPika.y][positionPika.x]) + 1;
    if (side === "R") paternR(positionPika);
    else paternL(positionPika);
  }
  if (
    positionPika.x === strat.x &&
    positionPika.y === strat.y &&
    condition === 3
  ) {
    break;
  }
}

for (let i = 0; i < tblMap.length; i++) {
  console.log(tblMap[i].join(""));
}
