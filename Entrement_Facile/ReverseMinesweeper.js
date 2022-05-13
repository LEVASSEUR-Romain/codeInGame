const w = parseInt(readline());
const h = parseInt(readline());
let retour = [];
for (let i = 0; i < h; i++) {
  const line = readline();
  retour.push(line.split(""));
}

for (let y = 0; y < retour.length; y++) {
  for (let x = 0; x < retour[y].length; x++) {
    if (retour[y][x] === "x") {
      retour[y][x] = "x";
      if (retour[y - 1]?.[x] && retour[y - 1][x] !== "x") {
        retour[y - 1][x] = retour[y - 1][x] === "." ? 1 : retour[y - 1][x] + 1;
      }
      if (retour[y - 1]?.[x - 1] && retour[y - 1][x - 1] !== "x") {
        retour[y - 1][x - 1] =
          retour[y - 1][x - 1] === "." ? 1 : retour[y - 1][x - 1] + 1;
      }
      if (retour[y - 1]?.[x + 1] && retour[y - 1][x + 1] !== "x") {
        retour[y - 1][x + 1] =
          retour[y - 1][x + 1] === "." ? 1 : retour[y - 1][x + 1] + 1;
      }
      if (retour[y + 1]?.[x] && retour[y + 1][x] !== "x") {
        retour[y + 1][x] = retour[y + 1][x] === "." ? 1 : retour[y + 1][x] + 1;
      }
      if (retour[y + 1]?.[x - 1] && retour[y + 1][x - 1] !== "x") {
        retour[y + 1][x - 1] =
          retour[y + 1][x - 1] === "." ? 1 : retour[y + 1][x - 1] + 1;
      }
      if (retour[y + 1]?.[x + 1] && retour[y + 1][x + 1] !== "x") {
        retour[y + 1][x + 1] =
          retour[y + 1][x + 1] === "." ? 1 : retour[y + 1][x + 1] + 1;
      }
      if (retour[y][x - 1] && retour[y][x - 1] !== "x") {
        retour[y][x - 1] = retour[y][x - 1] === "." ? 1 : retour[y][x - 1] + 1;
      }
      if (retour[y][x + 1] && retour[y][x + 1] !== "x") {
        retour[y][x + 1] = retour[y][x + 1] === "." ? 1 : retour[y][x + 1] + 1;
      }
    }
  }
}

for (let i of retour) {
  console.log(i.join("").replaceAll("x", "."));
}
