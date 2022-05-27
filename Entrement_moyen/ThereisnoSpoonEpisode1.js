const width = parseInt(readline()); // the number of cells on the X axis
const height = parseInt(readline()); // the number of cells on the Y axis
let noeud = 0;
const listGame = [];
for (let i = 0; i < height; i++) {
  const line = readline(); // width characters, each either 0 or .
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "0") {
      noeud++;
    }
  }
  listGame.push(line.split(""));
}
while (noeud > 0) {
  for (let y = 0; y < listGame.length; y++) {
    for (let x = 0; x < listGame[y].length; x++) {
      if (listGame[y][x] === "0") {
        let send = "";
        send += "" + x + " " + y;
        // voisin de droite
        for (let i = x + 1; i < listGame[y].length + 1; i++) {
          if (listGame[y][i] === "0") {
            send += " " + i + " " + y;
            break;
          }
          if (listGame[y][i] === undefined) {
            send += " -1 -1";
            break;
          }
        }
        // voisin en dessous
        for (let i = y + 1; i < listGame.length + 1; i++) {
          if (listGame[i] !== undefined && listGame[i][x] === "0") {
            send += " " + x + " " + i;
            break;
          }

          if (listGame[i] === undefined) {
            send += " -1 -1";
            break;
          }
        }
        console.log(send);
        listGame[y][x] = "1";
      }
    }
  }
  noeud--;
}
