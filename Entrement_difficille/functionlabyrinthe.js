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

function SortPosition(allPosition) {
  allPosition.sort((a, b) => {
    return a.distance - b.distance;
  });
  return allPosition;
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

function ReupMap(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === ".") {
        // 1 2 3
        // 4 5 6
        // 7 8 9
        const p1 = map[y - 1]?.[x - 1];
        const p2 = map[y - 1]?.[x];
        const p3 = map[y - 1]?.[x + 1];
        const p4 = map[y][x - 1];
        const p5 = map[y][x];
        const p6 = map[y][x + 1];
        const p7 = map[y + 1]?.[x - 1];
        const p8 = map[y + 1]?.[x];
        const p9 = map[y + 1]?.[x + 1];

        //  .#. // ...
        //  #.#
        //  ... // .#.
        if (
          p4 === "#" &&
          p6 === "#" &&
          ((p2 === "#" && p8 === ".") || (p8 === "#" && p2 === "."))
        ) {
          changeStringMap(map, "#", x, y);
        }
        // .#.
        // #.. // ..#
        // .#.
        // point entouré de # vers la gauche
        if (
          ((p4 === "#" && p6 === ".") || (p6 === "#" && p4 === ".")) &&
          p8 === "#" &&
          p2 === "#"
        ) {
          changeStringMap(map, "#", x, y);
        }
        // ##. || #..
        // #..
        // #.. || ##.
        if (
          (p1 === "#" || p1 === "?") &&
          p4 === "#" &&
          p7 === "#" &&
          p3 === "." &&
          p6 === "." &&
          p9 === "." &&
          ((p2 === "#" && p8 === ".") || (p8 === "#" && p2 === "."))
        ) {
          changeStringMap(map, "#", x, y);
        }
        // .## // ..#
        // ..#
        // ..# // .##
        if (
          p3 === "#" &&
          p6 === "#" &&
          (p9 === "#" || p9 === "?") &&
          p1 === "." &&
          p4 === "." &&
          p7 === "." &&
          ((p2 === "#" && p8 === ".") || (p8 === "#" && p2 === "."))
        ) {
          changeStringMap(map, "#", x, y);
        }
      }
    }
  }
}

function changeStringMap(map, string, x, y) {
  map[y] = map[y].substring(0, x) + string + map[y].substring(x + 1);
}

function upDateMap(mapUpdate, map, perso) {
  // on regarde a 3 cases autour du perso
  for (let i = 0; i < mapUpdate.length; i++) {
    const stringAdd = mapUpdate[i][0].substring(perso.x - 3, perso.x + 3);
    // avant et aprés on découpe
    const stringAfter = map[mapUpdate[i][1]].substring(0, perso.x - 3);
    const stringBefore = map[mapUpdate[i][1]].substring(
      perso.x + 3,
      map[mapUpdate[i][1]].length
    );
    map[mapUpdate[i][1]] = stringAfter + stringAdd + stringBefore;
  }
}

// avant asychn
/* switch (condition) {
  case "road":
    mouvementPossible = findBestChemin(map, myPerso, "?", 30);
    if (mouvementPossible !== false) {
      console.log(mouvementPossible[0]);
    } else {
      mouvementPossible = findBestChemin(map, myPerso, "C", 300);
      console.log(mouvementPossible[0]);
      mouvementPossible.splice(0, 1);
      condition = mouvementPossible.length === 0 ? "Go to T" : "Go to C";
    }
    break;
  case "Go to C":
    console.log(mouvementPossible[0]);
    mouvementPossible.splice(0, 1);
    if (mouvementPossible.length === 0) {
      condition = "Go to T";
    }
    break;
  case "Go to T":
    mouvementPossible = findBestChemin(map, myPerso, "T", A + 1);
    // ici trop de chemin vers T
    if (mouvementPossible !== false) {
      console.log(mouvementPossible[0]);
      mouvementPossible.splice(0, 1);
      condition = "roadFinal";
    }
    break;
  case "roadFinal":
    console.log(mouvementPossible[0]);
    mouvementPossible.splice(0, 1);
    break;
}
} */
