/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(" ");
const W = parseInt(inputs[0]); // width of the building.
const H = parseInt(inputs[1]); // height of the building.
const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(" ");
const X0 = parseInt(inputs[0]);
const Y0 = parseInt(inputs[1]);
// initialisation
const carreRecherche = {
  xMin: 0,
  xMax: 0,
  yMin: 0,
  yMax: 0,
};
let Position = { x: X0, y: Y0 };
// utilitaire
function deplacementX() {
  return Math.round((carreRecherche.xMax - carreRecherche.xMin) / 2);
}
function deplacementY() {
  return Math.round((carreRecherche.yMax - carreRecherche.yMin) / 2);
}
// mouvement
function auDessus() {
  carreRecherche.yMax = Position.y;
  Position.y = Position.y - deplacementY();
}
function enDessous() {
  carreRecherche.yMin = Position.y;
  if (carreRecherche.yMax === 0) {
    carreRecherche.yMax = H - 1;
  }
  Position.y = Position.y + deplacementY();
}

function agauche() {
  carreRecherche.xMax = Position.x;
  Position.x = Position.x - deplacementX();
}

function aDroite() {
  carreRecherche.xMin = Position.x;
  if (carreRecherche.xMax === 0) {
    carreRecherche.xMax = W - 1;
  }
  Position.x = Position.x + deplacementX();
}

function deplacement(direction) {
  switch (direction) {
    case "U":
      auDessus();
      break;
    case "R":
      aDroite();
      break;
    case "L":
      agauche();
      break;
    case "D":
      enDessous();
      break;
    case "UR":
      aDroite();
      auDessus();
      break;
    case "DR":
      enDessous();
      aDroite();
      break;

    case "DL":
      enDessous();
      agauche();
      break;

    case "UL":
      auDessus();
      agauche();
      break;
  }
}
// game loop
while (true) {
  const bombDir = readline();
  deplacement(bombDir);
  console.log(Position.x + " " + Position.y);
}
