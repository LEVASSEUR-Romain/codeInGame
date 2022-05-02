let mapShinte = [];
const possibilities = {
  R: "RIGHT",
  L: "LEFT",
  U: "UP",
  D: "DOWN",
};
function changeSavePosition(myposition, mouvement) {
  switch (mouvement) {
    case "RIGHT":
      return { x: myposition.x + 1, y: myposition.y };
    case "LEFT":
      return { x: myposition.x - 1, y: myposition.y };
    case "UP":
      return { x: myposition.x, y: myposition.y - 1 };
    case "DOWN":
      return { x: myposition.x, y: myposition.y + 1 };
  }
}

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

function finBestCheminWithStop(map, perso, objectif, save, refrech) {
  let tbl = [];
  let niveau = 0;

  if (refrech) {
    tbl = [[{ x: perso.x, y: perso.y, sous: 0 }]];
    mapShinte = [...map];
  } else {
    tbl = [...save.tableauSave];
    niveau = tbl.length - 1;
  }
  const breakPoint = 10;
  let find = false;
  let endWhile = true;
  let breakStop = 0;
  while (endWhile) {
    if (breakStop > breakPoint) {
      endWhile = false;
      break;
    }
    breakStop++;
    tbl.push([]);
    niveau = niveau + 1;
    for (let i = 0; i < tbl[niveau - 1].length; i++) {
      const x = tbl[niveau - 1][i].x;
      const y = tbl[niveau - 1][i].y;

      if (mapShinte[y]?.[x + 1] !== "#") {
        if (!noeudExiste({ x: x + 1, y: y }, tbl[niveau])) {
          tbl[niveau].push({
            x: x + 1,
            y: y,
            sous: i,
            direction: possibilities.R,
          });

          if (mapShinte[y][x + 1] === objectif) {
            find = true;
            endWhile = false;
            break;
          }
        }
      }
      if (mapShinte[y]?.[x - 1] !== "#") {
        if (!noeudExiste({ x: x - 1, y: y }, tbl[niveau])) {
          tbl[niveau].push({
            x: x - 1,
            y: y,
            sous: i,
            direction: possibilities.L,
          });

          if (mapShinte[y][x - 1] === objectif) {
            find = true;
            endWhile = false;
            break;
          }
        }
      }
      if (mapShinte[y - 1]?.[x] !== "#") {
        if (!noeudExiste({ x: x, y: y - 1 }, tbl[niveau])) {
          tbl[niveau].push({
            x: x,
            y: y - 1,
            sous: i,
            direction: possibilities.U,
          });
          if (mapShinte[y - 1][x] === objectif) {
            find = true;
            endWhile = false;
            break;
          }
        }
      }
      if (mapShinte[y + 1]?.[x] !== "#") {
        if (!noeudExiste({ x: x, y: y + 1 }, tbl[niveau])) {
          tbl[niveau].push({
            x: x,
            y: y + 1,
            sous: i,
            direction: possibilities.D,
          });
          if (mapShinte[y + 1][x] === objectif) {
            find = true;
            endWhile = false;
            break;
          }
        }
      }
      let coupe = mapShinte[y].split("");
      coupe[x] = "#";
      mapShinte[y] = coupe.join("");
    }
  }
  if (find) {
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
    return {
      findC: true,
      findT: objectif === "T" ? true : false,
      tableauSave: [],
      cheminC: objectif === "C" ? chemin.reverse() : save.cheminC,
      cheminT: objectif === "T" ? chemin.reverse() : [],
    };
  } else {
    return {
      findC: objectif === "C" ? false : save.findC,
      findT: false,
      tableauSave: [...tbl],
      cheminC: objectif === "C" ? [] : save.cheminC,
      cheminT: [],
    };
  }
}

function findBestChemin(map, perso, objectif, maxRecherche) {
  let tbl = [[{ x: perso.x, y: perso.y, sous: 0 }]];
  let endWhile = true;
  let niveau = 0;
  let myMap = [...map];
  while (endWhile) {
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
let positionT;
let loop = 0;
let condition = "road";
let positionC = false;
let saveMoveAfter = "";
let savePosition = { x: 0, y: 0 };
let mouvementPossible = [];
let saveTbl = [];
let reGoT = false;
let rapprocherdeC = [];
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
  //console.error(map);
  //console.error(condition);
  //console.error(myPerso, "mon perso");
  // on recupere la promise

  switch (condition) {
    case "road":
      mouvementPossible = findBestChemin(map, myPerso, "?", 60);
      if (mouvementPossible !== false) {
        console.log(mouvementPossible[0]);
        // ici peu etre bug save
        saveMoveAfter = mouvementPossible[0];
      } else {
        condition = "Go Wait find";
        savePosition = { ...myPerso };
        mouvementPossible = false;
        saveTbl = finBestCheminWithStop(
          map,
          savePosition,
          "C",
          undefined,
          true
        );
        saveMoveAfter = invsereMovement(saveMoveAfter);
        console.log(saveMoveAfter);
      }
      break;
    case "Go Wait find":
      // on travaille
      if (saveTbl.findC === false) {
        saveTbl = finBestCheminWithStop(map, savePosition, "C", saveTbl, false);
      } else if (saveTbl.findT === false && reGoT === false) {
        reGoT = true;
        rapprocherdeC = saveTbl.cheminC;
        saveTbl = finBestCheminWithStop(map, positionC, "T", saveTbl, true);
      } else if (reGoT && saveTbl.findT === false) {
        saveTbl = finBestCheminWithStop(map, positionC, "T", saveTbl, false);
      }
      if (
        saveTbl.findC === true &&
        saveTbl.findT === true &&
        savePosition.x === myPerso.x &&
        savePosition.y === myPerso.y
      ) {
        mouvementPossible = saveTbl.cheminC.concat(saveTbl.cheminT);
        console.log(mouvementPossible[0]);
        mouvementPossible.splice(0, 1);
        condition = "Go to C and T";
      } else if (
        saveTbl.findC === true &&
        rapprocherdeC.length !== 1 &&
        savePosition.x === myPerso.x &&
        savePosition.y === myPerso.y
      ) {
        rapprocherdeC = saveTbl.cheminC;
        console.log(rapprocherdeC[0]);
        savePosition = changeSavePosition(savePosition, rapprocherdeC[0]);
        saveMoveAfter = rapprocherdeC[0];
        rapprocherdeC.splice(0, 1);
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
