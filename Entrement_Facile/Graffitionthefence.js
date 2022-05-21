function sortTbl(tbl) {
  let tblEnd = [];
  for (let i = 0; i < tbl.length; i++) {
    const interval = tbl[i];
    let isOk = false;
    tblEnd.forEach((element) => {
      if (interval[0] >= element[0] && interval[0] <= element[1]) {
        const max = Math.max(interval[1], element[1]);
        const min = Math.min(interval[0], element[0]);
        element[0] = min;
        element[1] = max;
        isOk = true;
      }
    });
    if (!isOk) tblEnd.push(interval);
  }
  return tblEnd;
}
const L = parseInt(readline());
const N = parseInt(readline());
let tblPaint = [];
for (let i = 0; i < N; i++) {
  var inputs = readline().split(" ");
  const st = parseInt(inputs[0]);
  const ed = parseInt(inputs[1]);
  tblPaint.push([st, ed]);
}
let finish = [];
tblPaint.sort((a, b) => a[0] - b[0]);
let tbl = sortTbl(tblPaint);
let start = 0;
let end = 0;
let finich = [];
// cas entre 0 et le premier
if (tbl[0][0] !== 0) {
  finich.push([start, tbl[0][0]]);
}
for (let i = 0; i < tbl.length; i++) {
  start = tbl[i][1];
  if (tbl[i + 1]?.[0] !== undefined) {
    end = tbl[i + 1][0];
  } else {
    end = L;
  }
  if (start != end) finich.push([start, end]);
}
if (finich.length === 0) console.log("All painted");
else finich.forEach((e) => console.log(e[0] + " " + e[1]));
