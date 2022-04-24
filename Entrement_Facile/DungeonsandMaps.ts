interface Positionxy {
  x: number;
  y: number;
}

var inputs: string[] = readline().split(" ");
const w: number = parseInt(inputs[0]);
const h: number = parseInt(inputs[1]);
var inputs: string[] = readline().split(" ");

const maPostionDepart: Positionxy = {
  x: parseInt(inputs[0]),
  y: parseInt(inputs[1]),
};
let movementParcourt = [];
const map = [];
let possible = true;
const n: number = parseInt(readline());
for (let i = 0; i < n; i++) {
  const carte = [];
  for (let j = 0; j < h; j++) {
    const mapRow: string = readline();
    carte.push(mapRow);
  }
  map.push(carte);
}
function horsMap(maPosition: Positionxy): boolean {
  if (
    maPosition.x < 0 ||
    maPosition.x > w - 1 ||
    maPosition.y < 0 ||
    maPosition.y > h - 1
  ) {
    return true;
  }
  return false;
}

function action(test: string, maPosition: Positionxy): boolean {
  switch (test) {
    case ".":
      possible = false;
      return false;
    case "#":
      possible = false;
      return false;
    case "^":
      maPosition.x = maPosition.x - 1;
      return true;
    case "<":
      maPosition.y = maPosition.y - 1;
      return true;
    case ">":
      maPosition.y = maPosition.y + 1;
      return true;
    case "v":
      maPosition.x = maPosition.x + 1;
      return true;
    case "T":
      return false;
  }
}

for (let i = 0; i < map.length; i++) {
  let maPosition = { ...maPostionDepart };
  let tailleParcourt = 0;
  possible = true;
  let finduwhile = true;
  while (finduwhile) {
    //rajouter si possition similaire au départ on arrete
    finduwhile = action(map[i][maPosition.x][maPosition.y], maPosition);
    tailleParcourt = tailleParcourt + 1;
    if (
      (maPosition.x === maPostionDepart.x &&
        maPosition.y === maPostionDepart.y) ||
      horsMap(maPosition)
    ) {
      possible = false;
      break;
    }
  }
  if (possible) {
    movementParcourt.push([tailleParcourt, i]);
  }
}

if (movementParcourt.length !== 0) {
  movementParcourt.sort((a, b) => a[0] - b[0]);
  console.log(movementParcourt[0][1]);
} else {
  console.log("TRAP");
}
