const possibilities = {
  R: "RIGHT",
  L: "LEFT",
  U: "UP",
  D: "DOWN",
};
// g c'est ma contrainte de déplacement
const coutDeplacementG = 1;
const multiplicateurH = 1;

function directionMove(
  direction,
  openList,
  closedList,
  currentNode,
  objectif,
  id
) {
  let x = 0;
  let y = 0;
  switch (direction) {
    case possibilities.R:
      x = currentNode.x + 1;
      y = currentNode.y;
      break;
    case possibilities.L:
      x = currentNode.x - 1;
      y = currentNode.y;
      break;
    case possibilities.U:
      x = currentNode.x;
      y = currentNode.y - 1;
      break;
    case possibilities.D:
      x = currentNode.x;
      y = currentNode.y + 1;
      break;
  }

  if (
    !estIlDansLaListe(closedList, x, y) &&
    !estIlDansLaListe(openList, x, y)
  ) {
    if (x === objectif.x && y === objectif.y) {
      const f = distance({ x: x, y: y }, objectif) * multiplicateurH;
      closedList.push({
        id: id,
        x: x,
        y: y,
        parent: currentNode.id,
        direction: direction,
        g: currentNode.g + coutDeplacementG,
        f: f,
        h: f + currentNode.g + coutDeplacementG,
      });
      closedList.push({
        ...currentNode,
      });
      return true;
    } else {
      const f = distance({ x: x, y: y }, objectif) * multiplicateurH;
      openList.push({
        id: id,
        x: x,
        y: y,
        parent: currentNode.id,
        direction: direction,
        g: currentNode.g + coutDeplacementG,
        f: f,
        h: f + currentNode.g + coutDeplacementG,
      });
      return false;
    }
  }
}
function distance(a, b) {
  //console.error(a, b, "a ett b");
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function estIlDansLaListe(liste, x, y) {
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].x === x && liste[i].y === y) {
      return true;
    }
  }
  return false;
}
function aStar(map, start, end) {
  let id = 0;
  let cheminTrouve = false;

  // h c'est la distance de mon noeud jusqu'a l'objectif
  // f = g + h
  start = {
    id: 0,
    x: start.x,
    y: start.y,
    g: 0,
    h: distance(start, end),
    f: distance(start, end),
  };
  id++;
  // open List c'est la liste des noeuds a traiter
  let openList = [{ ...start }];
  // closed List c'est la liste des noeuds deja traiter
  let closedList = [];

  while (openList.length > 0) {
    // dans open list on cherche le noeuf qui a F le plus petit
    let currentNode = openList[0];
    //console.error(openList);
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
      }
    }
    const x = currentNode.x;
    const y = currentNode.y;

    // on regarde les nouveaux noeuf de currentNode
    if (map[y - 1]?.[x] !== "#") {
      if (
        directionMove(
          possibilities.U,
          openList,
          closedList,
          currentNode,
          end,
          id
        )
      ) {
        cheminTrouve = true;
        break;
      } else {
        id++;
      }
    }
    if (map[y + 1]?.[x] !== "#") {
      if (
        directionMove(
          possibilities.D,
          openList,
          closedList,
          currentNode,
          end,
          id
        )
      ) {
        cheminTrouve = true;
        break;
      } else {
        id++;
      }
    }
    if (map[y]?.[x - 1] !== "#") {
      if (
        directionMove(
          possibilities.L,
          openList,
          closedList,
          currentNode,
          end,
          id
        )
      ) {
        cheminTrouve = true;
        break;
      } else {
        id++;
      }
    }
    if (map[y]?.[x + 1] !== "#") {
      if (
        directionMove(
          possibilities.R,
          openList,
          closedList,
          currentNode,
          end,
          id
        )
      ) {
        cheminTrouve = true;
        break;
      } else {
        id++;
      }
    }

    // on ajoute currentNode a closedList
    closedList.push({ ...currentNode });
    // on supprime currentNode de openList
    openList = openList.filter((node) => node.id !== currentNode.id);
  } //fin while

  // si pas chemin trouver
  if (!cheminTrouve) {
    return false;
  } else {
    const retour = [];
    let currentId = id;
    while (currentId !== 0) {
      const currentNode = closedList.find((node) => {
        return node.id === currentId;
      });

      if (currentId !== 0) {
        retour.push(currentNode.direction);
      }
      currentId = currentNode.parent;
    }
    return retour.reverse();
  }
}
function searchAllPositionInterrogationNextPoint(map) {
  let tbl = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (
        map[i][j] === "?" &&
        (map[i][j + 1] === "." ||
          map[i][j - 1] === "." ||
          map[i + 1]?.[j] === "." ||
          map[i - 1]?.[j] === ".")
      ) {
        tbl.push({
          x: j,
          y: i,
        });
      }
    }
  }
  return tbl;
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
var inputs = readline().split(" ");
const R = parseInt(inputs[0]);
const C = parseInt(inputs[1]);
const A = parseInt(inputs[2]);
let positionT;
let loop = 0;
let condition = "road";
let positionC = false;
let mouvementPossible = [];
let attendreCheminC = true;
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
  // debug
  //console.error(map);

  switch (condition) {
    case "road":
      if (positionC === false || attendreCheminC === false) {
        if (mouvementPossible.length === 0 || mouvementPossible !== false) {
          const allPosition = searchAllPositionInterrogationNextPoint(
            map,
            myPerso
          );
          if (allPosition.length > 2) {
            mouvementPossible = findBestChemin(map, myPerso, "?", 40);
            console.log(mouvementPossible[0]);
            mouvementPossible.splice(0, 1);
          } else {
            let i = 0;
            let endWhile = true;
            while (endWhile) {
              mouvementPossible = aStar(map, myPerso, allPosition[i]);
              if (mouvementPossible !== false) {
                console.log(mouvementPossible[0]);
                mouvementPossible.splice(0, 1);
                endWhile = false;
                break;
              }
              i++;
            }
          }
        } else {
          console.log(mouvementPossible[0]);
          mouvementPossible.splice(0, 1);
          if (mouvementPossible.length === 0) {
            attendreCheminC = true;
          }
        }
      } else {
        //console.error("essaye C chemin");
        //console.error(positionC, "position C");
        //console.error(myPerso, "position myPerso");
        mouvementPossible = aStar(map, myPerso, positionC);

        if (mouvementPossible !== false) {
          console.log(mouvementPossible[0]);
          mouvementPossible.splice(0, 1);
          condition = "Go to C";
        }
        attendreCheminC = false;
      }
      break;
    case "Go to C":
      if (mouvementPossible.length !== 0) {
        console.log(mouvementPossible[0]);
        mouvementPossible.splice(0, 1);
      } else {
        //console.error("go to T");
        mouvementPossible = aStar(map, myPerso, positionT);
        console.log(mouvementPossible[0]);
        mouvementPossible.splice(0, 1);
        consdition = "Go to T";
      }
      break;
    case "Go to T":
      console.log(mouvementPossible[0]);
      mouvementPossible.splice(0, 1);
      break;
  }
}
