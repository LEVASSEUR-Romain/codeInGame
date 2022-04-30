function constructionTbl(tbl: number[]): number[] {
  const retour = [];

  for (let i = 0; i < tbl.length - 1; i++) {
    for (let j = i + 1; j < tbl.length; j++) {
      retour.push(tbl[j] - tbl[i]);
    }
  }
  return retour;
}

function comparaisonList(tbl: number[], tbl1: number[]): number {
  let retour = 0;
  for (let i = 0; i < tbl.length; i++) {
    for (let j = 0; j < tbl1.length; j++) {
      if (tbl[i] === tbl1[j]) {
        retour++;
      }
    }
  }
  return retour;
}

let sommeX: number[] = [0];
let sommeY: number[] = [0];
var inputs: string[] = readline().split(" ");
const w: number = parseInt(inputs[0]);
const h: number = parseInt(inputs[1]);
const countX: number = parseInt(inputs[2]);
const countY: number = parseInt(inputs[3]);
var inputs: string[] = readline().split(" ");
for (let i = 0; i < countX; i++) {
  const x: number = parseInt(inputs[i]);
  sommeX.push(x);
}
var inputs: string[] = readline().split(" ");
for (let i = 0; i < countY; i++) {
  const y: number = parseInt(inputs[i]);
  sommeY.push(y);
}
sommeX.push(w);
sommeY.push(h);
sommeX = constructionTbl(sommeX);
sommeY = constructionTbl(sommeY);

console.log(comparaisonList(sommeX, sommeY));
