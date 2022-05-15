var inputs = readline().split(" ");
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
const T1 = parseInt(inputs[2]);
const T2 = parseInt(inputs[3]);
const T3 = parseInt(inputs[4]);
const map1 = [];
const map2 = [];
const itemStart = [];
const itemStart2 = [];
const itemFinal = [];
for (let i = 0; i < H; i++) {
  var inputs = readline().split(" ");
  const firstPictureRow = inputs[0];
  const secondPictureRow = inputs[1];
  map1.push(firstPictureRow.split(""));
  map2.push(secondPictureRow.split(""));
}
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (map1[y][x] !== ".")
      itemStart.push({ value: map1[y][x], x: x, y: y, time: T1 });
    if (map2[y][x] !== ".")
      itemStart2.push({ value: map2[y][x], x: x, y: y, time: T2 });
  }
}
// on comparer les position de deux tableaux
for (let i = 0; i < itemStart.length; i++) {
  for (let j = 0; j < itemStart2.length; j++) {
    if (itemStart[i].value === itemStart2[j].value) {
      let xUnitaireMove =
        (itemStart[i].x - itemStart2[j].x) /
        (itemStart[i].time - itemStart2[j].time);
      let yUnitaireMove =
        (itemStart[i].y - itemStart2[j].y) /
        (itemStart[i].time - itemStart2[j].time);
      if (xUnitaireMove === -0) xUnitaireMove = 0;
      if (yUnitaireMove === -0) yUnitaireMove = 0;
      itemFinal.push({
        value: itemStart[i].value,
        x: Math.floor(xUnitaireMove * (T3 - T1) + itemStart[i].x),
        y: Math.floor(yUnitaireMove * (T3 - T1) + itemStart[i].y),
      });
    }
  }
}
// on filtre le tableau
for (let item of itemFinal) {
  for (let i = 0; i < itemFinal.length; i++) {
    if (
      item.x === itemFinal[i].x &&
      item.y === itemFinal[i].y &&
      item.value !== itemFinal[i].value
    ) {
      if (item.value.charCodeAt(0) < itemFinal[i].value.charCodeAt(0)) {
        // virrer de itemfinal
        itemFinal.splice(i, 1);
      }
    } else {
      // si hors map supprimer
      if (
        itemFinal[i].x < 0 ||
        itemFinal[i].x >= W ||
        itemFinal[i].y < 0 ||
        itemFinal[i].y >= H
      ) {
        itemFinal.splice(i, 1);
      }
    }
  }
}
// on affiche le resultat
for (let y = 0; y < H; y++) {
  let line = "";
  for (let x = 0; x < W; x++) {
    const item = itemFinal.find((item) => item.x === x && item.y === y);
    line += item ? item.value : ".";
  }
  console.log(line);
}
