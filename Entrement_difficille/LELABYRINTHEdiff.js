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

function calculateDistance(x, y, persoPosition) {
  let lengthX = 0;
  let lengthY = 0;
  if (x < persoPosition.x) {
    lengthX += persoPosition.x - x;
  } else if (x > persoPosition.x) {
    lengthX += x - persoPosition.x;
  }
  if (y < persoPosition.y) {
    lengthY += persoPosition.y - y;
  } else if (y > persoPosition.y) {
    lengthY += y - persoPosition.y;
  }
  const length = Math.abs(lengthX) + Math.abs(lengthY);

  return { length, lenghtX: lengthX, lenghtY: lengthY };
}

function isGoPreviewsMouvementObjectif(map, perso, mouvement, objectif) {
  if (mouvement === "RIGHT" && map[perso.y][perso.x + 1] === objectif) {
    return true;
  }
  if (mouvement === "LEFT" && map[perso.y][perso.x - 1] === objectif) {
    return true;
  }
  if (mouvement === "UP" && map[perso.y - 1][perso.x] === objectif) {
    return true;
  }
  if (mouvement === "DOWN" && map[perso.y + 1][perso.x] === objectif) {
    return true;
  }
  return false;
}

function findBestChemin(map, perso) {
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
      if (myMap[y][x + 1] !== "#") {
        tbl[niveau].push({
          x: x + 1,
          y: y,
          sous: i,
          direction: "RIGHT",
        });

        if (myMap[y][x + 1] === "?") {
          endWhile = false;
          break;
        }
      }
      if (myMap[y][x - 1] !== "#") {
        tbl[niveau].push({
          x: x - 1,
          y: y,
          sous: i,
          direction: "LEFT",
        });
        if (myMap[y][x - 1] === "?") {
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
        if (myMap[y - 1]?.[x] === "?") {
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
        if (myMap[y + 1]?.[x] === "?") {
          endWhile = false;
          break;
        }
      }
      let coupe = myMap[y].split("");
      coupe[x] = "#";
      myMap[y] = coupe.join("");
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
  console.error(chemin);
  return chemin.reverse();
}

function goToPosition(map, perso, positionObjectifFinal) {
  // block en x
  // je part de positionObjectifFinal je parcout mon tableau map
  // on regarde si je suis bloquer en x
  /*   const startX =
    positionObjectifFinal.x > perso.x ? perso.x : positionObjectifFinal.x;
  const stratY =
    positionObjectifFinal.y > perso.y ? perso.y : positionObjectifFinal.y;

  for (let y = 0; y < map.length; y++) {
    //max plus loins

    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#" && x <= positionObjectifFinal.y) {
      }
    }
  } */

  ecartX = positionObjectifFinal.x - perso.x;
  ecartY = positionObjectifFinal.y - perso.y;
  if (ecartX !== 0) {
    if (
      ecartX > 0 &&
      (map[perso.y][perso.x + 1] === "." ||
        map[perso.y][perso.x + 1] === "C" ||
        map[perso.y][perso.x + 1] === "T")
    ) {
      return possibilities.R;
    }
    if (
      ecartX < 0 &&
      (map[perso.y][perso.x - 1] === "." ||
        map[perso.y][perso.x - 1] === "C" ||
        map[perso.y][perso.x - 1] === "T")
    ) {
      return possibilities.L;
    }
  }
  if (ecartY !== 0) {
    if (
      ecartY > 0 &&
      (map[perso.y + 1][perso.x] === "." ||
        map[perso.y + 1][perso.x] === "C" ||
        map[perso.y + 1][perso.x] === "T")
    ) {
      return possibilities.D;
    }
    if (
      ecartY < 0 &&
      (map[perso.y - 1][perso.x] === "." ||
        map[perso.y - 1][perso.x] === "C" ||
        map[perso.y - 1][perso.x] === "T")
    ) {
      return possibilities.U;
    }
  }
}

function searchAllPositionInterrogationNextPoint(map, persoPosition) {
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
        const distance = calculateDistance(j, i, persoPosition);
        tbl.push({
          x: j,
          y: i,
          distance: distance.length,
          disntanceX: distance.lenghtX,
          disntanceY: distance.lenghtY,
        });
      }
    }
  }
  return tbl;
}

function SortPosition(allPosition) {
  allPosition.sort((a, b) => {
    return a.distance - b.distance;
  });
  return allPosition;
}

function mouvementPossibility(map, perso, after = "") {
  let tbl = [];
  if (
    map[perso.y][perso.x + 1] === "." ||
    map[perso.y][perso.x + 1] === "C" ||
    map[perso.y][perso.x + 1] === "T"
  ) {
    if (after !== "LEFT" || after === "") {
      tbl.push(possibilities.R);
    }
  }
  if (
    map[perso.y][perso.x - 1] === "." ||
    map[perso.y][perso.x - 1] === "C" ||
    map[perso.y][perso.x - 1] === "T"
  ) {
    if (after !== "RIGHT" || after === "") {
      tbl.push(possibilities.L);
    }
  }
  if (
    map[perso.y - 1][perso.x] === "." ||
    map[perso.y - 1][perso.x] === "C" ||
    map[perso.y - 1][perso.x] === "T"
  ) {
    if (after !== "DOWN" || after === "") {
      tbl.push(possibilities.U);
    }
  }
  if (
    map[perso.y + 1][perso.x] === "." ||
    map[perso.y + 1][perso.x] === "T" ||
    map[perso.y + 1][perso.x] === "C"
  ) {
    if (after !== "UP" || after === "") {
      tbl.push(possibilities.D);
    }
  }
  if (tbl.length === 0) {
    return mouvementPossibility(map, perso, "");
  }

  return tbl;
}

function posibiliteComparePosition(tblpoint, map, perso, posibilityMouvement) {
  for (let i = 0; i < tblpoint.length; i++) {
    for (let j = 0; j < posibilityMouvement.length; j++) {
      const found = goToPosition(map, perso, tblpoint[i]);
      if (found === posibilityMouvement[j]) {
        return found;
      }
    }
  }
  return posibiliteComparePosition(
    tblpoint,
    map,
    perso,
    mouvementPossibility(map, perso)
  );
}

var inputs = readline().split(" ");
const R = parseInt(inputs[0]);
const C = parseInt(inputs[1]);
const A = parseInt(inputs[2]);
let haveC = false;
let positionT;
let loop = 0;
let condition = 0;
let mouvementPossible = [];
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
    positionT = myPerso;
  }
  //debug
  console.error(map);
  console.error(myPerso, "mon perso");

  // possibilité de mouvement
  // Si condition = 0 on cherche C
  // Si condition = 1 on trouve C
  console.error("mouvementpossible avant if", mouvementPossible);
  if (condition === 0) {
    console.log(findBestChemin(map, myPerso)[0]);
    /*     if (mouvementPossible.length === 0) {
      mouvementPossible = findBestChemin(map, myPerso);
      console.error("mouvementpossible bug?", mouvementPossible);
      console.log(mouvementPossible[0]);
      mouvementPossible.slice(0, 1);
    } else {
      console.log(mouvementPossible[0]);
      mouvementPossible.slice(0, 1);
    } */
  }

  /*  if (!haveC) {
    findC = objectifCFindFlaseOrPosition(map);
    // on cherche le C
    if (findC === false) {
      const tblInterrogation = searchAllPositionInterrogationNextPoint(
        map,
        myPerso
      );
      if (tblInterrogation.length === 1) {
        const retour = goToPosition(map, myPerso, tblInterrogation[0]);
        console.log(retour);
        saveAfterPosition = retour;
      } else {
        const tblInterrogationSort = SortPosition(tblInterrogation);
        console.error("myTest2", tblInterrogationSort);
        console.error("posibilityMouvement", posibilityMouvement);

        const positionRetour = posibiliteComparePosition(
          tblInterrogationSort,
          map,
          myPerso,
          posibilityMouvement
        );
        console.error("positionRetour", positionRetour);
        console.log(positionRetour);
        saveAfterPosition = positionRetour;
      }
    }
    // on trouve C
    else {
      console.error("trouverC");
      const mouvement = goToPosition(map, myPerso, findC);
      console.log(mouvement);
      if (isGoPreviewsMouvementObjectif(map, myPerso, mouvement, "C")) {
        console.error("j'ai le c");
        haveC = true;
      }
    }
  }
  // on a C on rentre a T
  else {
    // c'est avec A que l'on cherche le meilleur parcourt
    console.log(goToPosition(map, myPerso, positionT));
  }
 */
  // debug break while
  loop++;
  if (loop > 200) {
    break;
  }
}
