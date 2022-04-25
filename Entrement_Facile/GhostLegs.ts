let matriceGame = [];
const retourFinal = {};
var inputs: string[] = readline().split(" ");
const W: number = parseInt(inputs[0]);
const H: number = parseInt(inputs[1]);
const premierLettre = [];
const arriver = [];
let pair = 1;
for (let i = 0; i < H; i++) {
  const line: string = readline();
  if (i === 0) {
    premierLettre.push(line.split("  "));
  } else if (i == H - 1) {
    arriver.push(line.split("  "));
  } else {
    let retourY = [];
    let suitX = 0;
    for (let x = 0; x < W; x += 3) {
      retourY[suitX] = 0;
      if (line[x - 1] == "-") {
        retourY[suitX] = pair;
        retourY[suitX - 1] = pair;
        pair++;
      }
      retourFinal[suitX] = {
        name: premierLettre[0][suitX],
        valueX: suitX,
        deplacement: false,
      };
      suitX++;
    }
    matriceGame.push(retourY);
  }
}
function resetDeplacement(): void {
  for (const i in retourFinal) {
    retourFinal[i].deplacement = false;
  }
}

for (let x = 0; x < matriceGame.length; x++) {
  resetDeplacement();
  for (let y = 0; y < matriceGame[x].length; y++) {
    for (const i in retourFinal) {
      if (matriceGame[x][y] !== 0) {
        if (retourFinal[i].valueX === y && !retourFinal[i].deplacement) {
          if (matriceGame[x][y + 1] === matriceGame[x][y]) {
            retourFinal[i].valueX += 1;
          } else {
            retourFinal[i].valueX -= 1;
          }
          retourFinal[i].deplacement = true;
        }
      }
    }
  }
}

for (const i in retourFinal) {
  console.log(retourFinal[i].name + arriver[0][retourFinal[i].valueX]);
}
