const possibilities = {
  R: "RIGHT",
  L: "LEFT",
  U: "UP",
  D: "DOWN",
};

function invsereMovement(saveMoveAfter) {
  switch (saveMoveAfter) {
    case "RIGHT":
      return "LEFT";
    case "LEFT":
      return "RIGHT";
    case "UP":
      return "DOWN";
    case "DOWN":
      return "UP";
  }
}

async function asyncCall(map, positionC, positionT, myPerso, A) {
  const promise = new Promise((resolve) => {
    return resolve(
      findBestChemin(map, myPerso, positionC, 500).concat(
        findBestChemin(map, myPerso, positionT, A - 1)
      )
    );
  });
  const retour = await promise;

  return retour;
}

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

function mapIsFullDiscover(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "?") {
        return false;
      }
    }
  }
  return true;
}

function noeudExiste(noeud, liste) {
  if (liste.length !== 0) {
    for (let i = 0; i < liste.length; i++) {
      if (noeud.x === liste[i].x && noeud.y === liste[i].y) {
        return true;
      }
    }
  }
  return false;
}

function findBestChemin(map, perso, objectif, maxRecherche) {
  let tbl = [[{ x: perso.x, y: perso.y, sous: 0 }]];
  let endWhile = true;
  let niveau = 0;
  let myMap = [...map];
  while (endWhile) {
    console.error("dans le while");
    tbl.push([]);
    niveau = niveau + 1;
    for (let i = 0; i < tbl[niveau - 1].length; i++) {
      const x = tbl[niveau - 1][i].x;
      const y = tbl[niveau - 1][i].y;
      if (myMap[y]?.[x + 1] !== "#") {
        // avant de puch on regarde si le noeud existe deja
        if (!noeudExiste({ x: x + 1, y: y }, tbl[niveau])) {
          tbl[niveau].push({
            x: x + 1,
            y: y,
            sous: i,
            direction: possibilities.R,
          });

          if (myMap[y][x + 1] === objectif) {
            endWhile = false;
            break;
          }
        }
      }
      if (myMap[y]?.[x - 1] !== "#") {
        if (!noeudExiste({ x: x - 1, y: y }, tbl[niveau])) {
          tbl[niveau].push({
            x: x - 1,
            y: y,
            sous: i,
            direction: possibilities.L,
          });

          if (myMap[y][x - 1] === objectif) {
            endWhile = false;
            break;
          }
        }
      }
      if (myMap[y - 1]?.[x] !== "#") {
        if (!noeudExiste({ x: x, y: y - 1 }, tbl[niveau])) {
          tbl[niveau].push({
            x: x,
            y: y - 1,
            sous: i,
            direction: possibilities.U,
          });
          if (myMap[y - 1][x] === objectif) {
            endWhile = false;
            break;
          }
        }
      }
      if (myMap[y + 1]?.[x] !== "#") {
        if (!noeudExiste({ x: x, y: y + 1 }, tbl[niveau])) {
          tbl[niveau].push({
            x: x,
            y: y + 1,
            sous: i,
            direction: possibilities.D,
          });
          if (myMap[y + 1][x] === objectif) {
            endWhile = false;
            break;
          }
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
let positionC = false;
let saveMoveAfter = "";
let savePosition = { x: 0, y: 0 };
// game loop
while (true) {
  // le t0 est le temps de depart
  const t0 = new Date().getTime();
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
  if (positionC === false) {
    positionC = objectifCFindFlaseOrPosition(map);
  }
  // On C
  /*  if (findC?.x === myPerso.x && findC?.y === myPerso.y) {
    condition = "Go to T";
  } */
  // si la map est découvert
  /*   if (condition === "road") {
    if (mapIsFullDiscover(map)) {
      mouvementPossible = findBestChemin(map, myPerso, "C", 50);
      condition = "Go to C";
    }
  } */
  //debug
  console.error(map);
  console.error(condition);
  //console.error(myPerso, "mon perso");

  switch (condition) {
    case "road":
      mouvementPossible = findBestChemin(map, myPerso, "?", 30);
      if (mouvementPossible !== false) {
        console.log(mouvementPossible[0]);
        // ici peu etre bug save
        saveMoveAfter = mouvementPossible[0];
      } else {
        condition = "Go Wait asynchrone";
        savePosition = { ...myPerso };
        mouvementPossible = asyncCall(map, positionC, positionT, myPerso, A);
        saveMoveAfter = invsereMovement(saveMoveAfter);
        console.log(saveMoveAfter);
      }
      break;
    case "Go Wait asynchrone":
      // Si mouvementPossible est un tableau

      console.error(mouvementPossible);
      if (
        Array.isArray(mouvementPossible) &&
        myPerso.x === savePosition.x &&
        myPerso.y === savePosition.y
      ) {
        console.log(mouvementPossible[0]);
        mouvementPossible.splice(0, 1);
        condition = "Go to C and T";
      } else {
        saveMoveAfter = invsereMovement(saveMoveAfter);
        console.log(saveMoveAfter);
      }
      break;
    case "Go to C and T":
      console.log(mouvementPossible[0]);
      mouvementPossible.splice(0, 1);
      break;
  }
}
