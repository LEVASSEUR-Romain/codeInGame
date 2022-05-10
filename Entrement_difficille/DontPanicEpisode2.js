const log = {
  w: "WAIT",
  e: "ELEVATOR",
  b: "BLOCK",
};
const movement = {
  L: "LEFT",
  R: "RIGHT",
};
let blocker = {};
let ObjetElevator = {};
var inputs = readline().split(" ");
const nbFloors = parseInt(inputs[0]); // number of floors
const width = parseInt(inputs[1]); // width of the area
const nbRounds = parseInt(inputs[2]); // maximum number of rounds
const exitFloor = parseInt(inputs[3]); // floor on which the exit is found
const exitPos = parseInt(inputs[4]); // position of the exit on its floor
const nbTotalClones = parseInt(inputs[5]); // number of generated clones
const nbAdditionalElevators = parseInt(inputs[6]); // number of additional elevators that you can build
const nbElevators = parseInt(inputs[7]); // number of elevators
for (let i = 0; i < nbElevators; i++) {
  var inputs = readline().split(" ");
  const elevatorFloor = parseInt(inputs[0]); // floor on which this elevator is found
  const elevatorPos = parseInt(inputs[1]); // position of the elevator on its floor
  addObjetElevator(elevatorFloor, elevatorPos);
}
// on ajoute le dernier
addObjetElevator(exitFloor, exitPos);

function addObjetElevator(niveau, position) {
  if (ObjetElevator[niveau] === undefined) {
    ObjetElevator[niveau] = [position];
  } else {
    ObjetElevator[niveau].push(position);
  }
}
function havePosition(position, niveau) {
  for (let i = 0; i < ObjetElevator[niveau].length; i++) {
    if (ObjetElevator[niveau][i] === position) {
      return true;
    }
  }
  return false;
}
function changementPosition(position, direction) {
  if (direction === movement.L && position < exitPos) {
    return true;
  }
  if (direction === movement.R && position > exitPos) {
    return true;
  }
  return false;
}
function plusPetitDeLaCloseListe(liste) {
  let min = 0;
  for (let i = exitFloor; i < liste.length; i++) {
    if (min === 0 && liste[i].niveau === exitFloor) {
      min = liste[i];
    }
    if (liste[i].coutTotal < min.coutTotal && liste[i].niveau === exitFloor) {
      min = liste[i];
    }
  }
  return min;
}
function actionExecute(objet) {
  const tbl = [];
  if (objet.action === log.e) {
    tbl.push(log.e);
    for (let i = 0; i < objet.cout; i++) {
      tbl.push(log.w);
    }
  }
  if (objet.action === log.b) {
    tbl.push(log.b);
    for (let i = 0; i < objet.cout; i++) {
      tbl.push(log.w);
    }
  }
  if (objet.action === log.w) {
    for (let i = 0; i < objet.cout; i++) {
      tbl.push(log.w);
    }
  }
  return tbl;
}
function changementRightLeft(direction) {
  if (direction === movement.L) {
    return movement.R;
  }
  return movement.L;
}
function chercheById(liste, id) {
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].id === id) {
      return liste[i];
    }
  }
}
function chercheLecoutLeplusBas(liste) {
  let min = liste[0];
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].coutTotal < min.coutTotal) {
      min = liste[i];
    }
  }
  return min;
}

function findBestChemin(p, d) {
  let position = p;
  let niveau = -1;
  let id = 0;
  let direction = d;
  let openList = [];
  let closeList = [];
  let coutChangementDirection = 2;
  let coutElevator = 3;
  let elevatorPlus =
    nbAdditionalElevators + (nbFloors - Object.keys(ObjetElevator).length);
  openList.push({
    id: id,
    niveau: niveau,
    cout: 0,
    coutTotal: 0,
    direction: direction,
    position: position,
    parent: 0,
    elevator: elevatorPlus,
  });
  id++;
  while (openList.length > 0) {
    const currentNode = chercheLecoutLeplusBas(openList);
    let testElevator = currentNode.elevator > 1 ? true : false;
    console.error(currentNode);
    niveau = currentNode.niveau === -1 ? 0 : currentNode.niveau + 1;
    if (ObjetElevator[niveau] === undefined || testElevator) {
      if (testElevator) {
        currentNode.elevator--;
        testElevator = false;
      }
      addObjetElevator(niveau, position);
      openList.push({
        id: id,
        niveau: currentNode.niveau === -1 ? 0 : niveau,
        cout: coutElevator,
        direction: currentNode.direction,
        coutTotal: coutElevator + currentNode.coutTotal,
        position: currentNode.position,
        action: log.e,
        parent: currentNode.id,
        elevator: currentNode.elevator,
      });
      id++;
    } else {
      for (let i = 0; i < ObjetElevator[niveau].length; i++) {
        let changementDirection = false;
        let surcout = 0;
        let surcoutTotal = 0;
        if (
          currentNode.direction === movement.L &&
          currentNode.position < ObjetElevator[niveau][i]
        ) {
          changementDirection = true;
          surcout += coutChangementDirection;
        } else if (
          currentNode.direction === movement.R &&
          currentNode.position > ObjetElevator[niveau][i]
        ) {
          changementDirection = true;
          surcout += coutChangementDirection;
        }
        // 1 a payer pour monter un étages
        surcout += 1;
        if (changementDirection) {
          surcoutTotal = 1;
        }

        openList.push({
          id: id,
          niveau: currentNode.niveau === -1 ? 0 : niveau,
          cout:
            Math.abs(ObjetElevator[niveau][i] - currentNode.position) + surcout,
          coutTotal:
            Math.abs(ObjetElevator[niveau][i] - currentNode.position) +
            surcout +
            currentNode.coutTotal +
            surcoutTotal,
          direction: changementDirection
            ? changementRightLeft(currentNode.direction)
            : currentNode.direction,
          action: changementDirection ? log.b : log.w,
          position: ObjetElevator[niveau][i],
          parent: currentNode.id,
          elevator: currentNode.elevator,
        });
        id++;
      }
    }
    closeList.push({ ...currentNode });
    openList.shift();
    if (niveau >= exitFloor + 1) {
      break;
    }
    /*     if (niveau >= exitFloor + 1) {
      //console.error("pushopenlist", ...openList);
      for (let i = 0; i < openList.length; i++) {
        closeList.push({ ...openList[i] });
      }
      openList = [];
    } else {
      closeList.push({ ...currentNode });
      openList.shift();
    } */
  }

  const petitClose = plusPetitDeLaCloseListe(closeList);
  //const petitClose = chercheById(closeList, 159);
  let listAfaire = [];
  // Si max rounds égal au chemin le plus petit
  if (petitClose.coutTotal <= nbRounds + 10) {
    //if (true) {
    listAfaire = listAfaire.concat(actionExecute(petitClose));
    let id = petitClose.parent;
    for (let i = closeList.length - 1; i > -1; i--) {
      if (closeList[i].id === id && id != 0) {
        console.error(closeList[i]);
        listAfaire = actionExecute(closeList[i]).concat(listAfaire);
        id = closeList[i].parent;
      }
    }
  }
  return listAfaire;
}

function blockOrNotWithElev(position, direction, niveau) {
  if (nbTotalClones > nbFloors) {
    addObjetElevator(niveau, position);
    return log.e;
  } else if (
    direction === movement.L &&
    ObjetElevator[niveau] > position &&
    blocker[niveau] === undefined
  ) {
    blocker[niveau] = 1;
    return log.b;
  } else if (
    direction === movement.R &&
    ObjetElevator[niveau] < position &&
    blocker[niveau] === undefined
  ) {
    blocker[niveau] = 1;
    return log.b;
  } else {
    return log.w;
  }
}
function blockOrNotWithEnd(position, direction) {
  if (
    direction === movement.L &&
    position > exitPos &&
    blocker[exitFloor] === undefined
  ) {
    blocker[exitFloor] = 1;
    return log.b;
  } else if (
    direction === movement.R &&
    exitPos < position &&
    blocker[exitFloor] === undefined
  ) {
    blocker[exitFloor] = 1;
    return log.b;
  } else {
    return log.w;
  }
}

function decision(niveau, position, direction) {
  if (niveau === exitFloor) {
    //niveau de sortie
    return blockOrNotWithEnd(position, direction);
  } else if (
    ObjetElevator[niveau] === undefined ||
    havePosition(position, niveau)
  ) {
    // on a pas d'elevator au niveau
    addObjetElevator(niveau, position);
    return log.w;
  } else if (ObjetElevator[niveau] !== undefined) {
    // va t'on dans la bonne direction
    return blockOrNotWithElev(position, direction, niveau);
  } else {
    return log.w;
  }
}

let test = 0;
let actionAfaire = [];
let iteration = 0;
// game loop
while (true) {
  var inputs = readline().split(" ");
  const cloneFloor = parseInt(inputs[0]); // floor of the leading clone
  const clonePos = parseInt(inputs[1]); // position of the leading clone on its floor
  const direction = inputs[2]; // direction of the leading clone: LEFT or RIGHT
  console.error(nbAdditionalElevators, "elevator");
  //console.error(blocker, "position final");
  console.error("clonePos", clonePos);
  //console.error("extiPos", exitPos);
  //console.error(cloneFloor, "cloneFloor");
  //console.error(changementPosition(clonePos, direction));
  console.error(nbElevators, "nbElevators");
  console.error(nbRounds, "nbRounds");

  if (actionAfaire.length === 0) {
    actionAfaire = findBestChemin(clonePos, direction);
    console.error(actionAfaire, "actionAfaire");
  }
  // si -1 -1 on fait rien
  //if (cloneFloor !== -1) {
  console.error("iteration");
  console.log(actionAfaire[iteration]);
  iteration++;
  //console.log(decision(cloneFloor, clonePos, direction));
  //} else {
  //console.error("pas iteration");
  //console.log(log.w);
  //}
}
