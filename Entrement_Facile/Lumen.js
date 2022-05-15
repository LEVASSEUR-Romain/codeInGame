const N = parseInt(readline());
const L = parseInt(readline());
let positionLumiaire = [];
let listTable = [];
for (let i = 0; i < N; i++) {
  var inputs = readline().split(" ");
  listTable.push(inputs);
  for (let j = 0; j < N; j++) {
    const cell = inputs[j];
    if (cell === "C") {
      positionLumiaire.push({
        x: j,
        y: i,
      });
    }
  }
}
for (let j = 0; j < positionLumiaire.length; j++) {
  const lumiaire = positionLumiaire[j];
  const xMin = lumiaire.x - (L - 1) < 0 ? 0 : lumiaire.x - (L - 1);
  const xMax = lumiaire.x + (L - 1) > N - 1 ? N - 1 : lumiaire.x + (L - 1);
  const yMin = lumiaire.y - (L - 1) < 0 ? 0 : lumiaire.y - (L - 1);
  const yMax = lumiaire.y + (L - 1) > N - 1 ? N - 1 : lumiaire.y + (L - 1);

  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      if (listTable[y][x] != "C") {
        listTable[y][x] = "L";
      }
    }
  }
}
let mergedArray = [];
listTable.forEach((array) => {
  mergedArray = mergedArray.concat(array);
});
const countX = mergedArray.filter((x) => x === "X").length;
console.log(countX);
