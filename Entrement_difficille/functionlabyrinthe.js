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
