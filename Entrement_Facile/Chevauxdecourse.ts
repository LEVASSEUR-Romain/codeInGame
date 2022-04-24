const N: number = parseInt(readline());
const tbl: number[] = [];
let retour: number;
for (let i = 0; i < N; i++) {
  const pi: number = parseInt(readline());
  tbl.push(pi);
}
tbl.sort((a, b) => a - b);
for (let i = 1; i < tbl.length; i++) {
  if (retour === undefined) {
    retour = tbl[i] - tbl[0];
  } else {
    if (tbl[i] - tbl[i - 1] < retour) {
      retour = tbl[i] - tbl[i - 1];
    }
  }
}

console.log(retour);
