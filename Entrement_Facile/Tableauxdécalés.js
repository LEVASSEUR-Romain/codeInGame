const n = parseInt(readline());
let listTable = [];
for (let i = 0; i < n; i++) {
  const assignment = readline();
  const startTbl = /[[]([0-9-]{1,})[.]/g.exec(assignment)[1];
  const endTbl = /[.]([0-9-]{1,})]/g.exec(assignment)[1];
  const name = assignment.match(/^\w{1,}/)[0];
  const splitValue = assignment.split(" ");
  const startChiffre = 2;
  listTable[i] = { name: name };
  let count = 0;
  for (let j = parseInt(startTbl); j <= parseInt(endTbl); j++) {
    listTable[i][j] = splitValue[startChiffre + count];
    count++;
  }
}
function findLast(tbl, score = 0) {
  const last = /([A-Z]{1,})[[]([-0-9]{1,})]/.exec(tbl);
  if (last) {
    const name = last[1];
    const indexCible = last[2];
    const scoreTbl = listTable.find((tbl) => tbl.name === name);
    score = parseInt(scoreTbl[indexCible]);
    tbl = tbl.replace(last[0], score);
    return findLast(tbl, score);
  } else {
    return score;
  }
}
const x = readline();
console.log(findLast(x));
