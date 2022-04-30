const possibilities = {
  R: "RIGHT",
  L: "LEFT",
  U: "UP",
  D: "DOWN",
};

function objectifCFindFlaseOrPosition(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "C") {
        return { x: j, y: i };
      }
    }
  }
  return false;
}

function mapIsFullPoint(map, pourcent) {
  let point = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ".") {
        point = point + 1;
      }
    }
  }
  const totalMap = map.length * map[0].length;
  const pourcentage = (point / totalMap) * 100;
  console.error(pourcentage);
  if (pourcentage >= pourcent) {
    return true;
  }
  return false;
}

function findBestChemin(map, perso, objectif, maxRecherche) {
  let tbl = [[{ x: perso.x, y: perso.y, sous: 0 }]];
  let endWhile = true;
  let niveau = 0;
  let myMap = [...map];
  while (endWhile) {
    tbl.push([]);
    console.error(niveau);
    niveau = niveau + 1;
    for (let i = 0; i < tbl[niveau - 1].length; i++) {
      const x = tbl[niveau - 1][i].x;
      const y = tbl[niveau - 1][i].y;
      if (myMap[y]?.[x + 1] !== "#") {
        tbl[niveau].push({
          x: x + 1,
          y: y,
          sous: i,
          direction: "RIGHT",
        });

        if (myMap[y][x + 1] === objectif) {
          endWhile = false;
          break;
        }
      }
      if (myMap[y]?.[x - 1] !== "#") {
        tbl[niveau].push({
          x: x - 1,
          y: y,
          sous: i,
          direction: "LEFT",
        });
        if (myMap[y][x - 1] === objectif) {
          endWhile = false;
          break;
        }
      }
      if (myMap[y - 1]?.[x] !== "#") {
        tbl[niveau].push({
          x: x,
          y: y - 1,
          sous: i,
          direction: "UP",
        });
        if (myMap[y - 1][x] === objectif) {
          endWhile = false;
          break;
        }
      }
      if (myMap[y + 1]?.[x] !== "#") {
        tbl[niveau].push({
          x: x,
          y: y + 1,
          sous: i,
          direction: "DOWN",
        });
        if (myMap[y + 1][x] === objectif) {
          endWhile = false;
          break;
        }
      }
      let coupe = myMap[y].split("");
      coupe[x] = "#";
      myMap[y] = coupe.join("");
    }
    if (niveau === maxRecherche) {
      return false;
    }
  }
  let chemin = [];
  let postiontbl = 0;
  for (let i = tbl.length - 1; i > 0; i--) {
    if (i === tbl.length - 1) {
      postiontbl = tbl[i][tbl[i].length - 1].sous;
      chemin.push(tbl[i][tbl[i].length - 1].direction);
    } else {
      chemin.push(tbl[i][postiontbl].direction);
      postiontbl = tbl[i][postiontbl].sous;
    }
  }
  return chemin.reverse();
}

var inputs = readline().split(" ");
const R = parseInt(inputs[0]);
const C = parseInt(inputs[1]);
const A = parseInt(inputs[2]);
let haveC = false;
let positionT;
let loop = 0;
let condition = "road";
let mouvementPossible = [];
let findC = false;
// game loop
while (true) {
  var inputs = readline().split(" ");
  const KR = parseInt(inputs[0]);
  const KC = parseInt(inputs[1]);
  const myPerso = {
    x: KC,
    y: KR,
  };

  const map = [];
  for (let i = 0; i < R; i++) {
    const ROW = readline();
    map.push(ROW);
  }
  // position de T
  if (positionT === undefined) {
    positionT = { ...myPerso };
  }

  // Find C
  if (findC === false) {
    findC = objectifCFindFlaseOrPosition(map);
  }
  // On C
  if (findC?.x === myPerso.x && findC?.y === myPerso.y) {
    condition = "Go to T";
  }
  //debug
  console.error(map);
  console.error(condition);
  //console.error(myPerso, "mon perso");

  switch (condition) {
    case "road":
      // ici c'etait a 30
      mouvementPossible = findBestChemin(map, myPerso, "?", 30);
      console.error(mouvementPossible, "findBestChemin");
      if (mouvementPossible !== false) {
        console.log(mouvementPossible[0]);
      } else {
        mouvementPossible = findBestChemin(map, myPerso, "C", 50);
        console.log(mouvementPossible[0]);
        mouvementPossible.splice(0, 1);
        condition = mouvementPossible.length === 0 ? "Go to T" : "Go to C";
      }
      break;
    case "Go to C":
      console.error("Go to C", mouvementPossible[0]);
      console.log(mouvementPossible[0]);
      mouvementPossible.splice(0, 1);
      if (mouvementPossible.length === 0) {
        condition = "Go to T";
      }
      break;
    case "Go to T":
      mouvementPossible = findBestChemin(map, myPerso, "T", A + 1);
      console.error(mouvementPossible);
      console.log(mouvementPossible[0]);
      mouvementPossible.splice(0, 1);
      condition = "roadFinal";
      break;
    case "roadFinal":
      console.log(mouvementPossible[0]);
      mouvementPossible.splice(0, 1);
      break;
  }
}
