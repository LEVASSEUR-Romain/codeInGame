const w = parseInt(readline());
const h = parseInt(readline());
let table = [];
for (let i = 0; i < h; i++) {
  const line = readline();
  table.push(line.split(""));
}
function updateTable(y, x) {
  if (table[y]?.[x] && table[y][x] !== "x") {
    table[y][x] = table[y][x] === "." ? 1 : table[y][x] + 1;
  }
}

for (let y = 0; y < table.length; y++) {
  for (let x = 0; x < table[y].length; x++) {
    if (table[y][x] === "x") {
      table[y][x] = "x";
      updateTable(y - 1, x);
      updateTable(y - 1, x - 1);
      updateTable(y - 1, x + 1);
      updateTable(y + 1, x);
      updateTable(y + 1, x - 1);
      updateTable(y + 1, x + 1);
      updateTable(y, x - 1);
      updateTable(y, x + 1);
    }
  }
}

for (let i of table) {
  console.log(i.join("").replaceAll("x", "."));
}
