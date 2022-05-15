const N = parseInt(readline());
function goUpdtate(tbl, current) {
  for (let i = 0; i < tbl.length; i++) {
    if (current === tbl[i].last) {
      tbl[i].val.push(String.fromCharCode(current));
      return;
    } else if (current < tbl[i].last) {
      tbl[i].last = current;
      tbl[i].max++;
      tbl[i].val.push(String.fromCharCode(current));
      return;
    }
  }
  tbl.push({ val: [String.fromCharCode(current)], last: current, max: 1 });
  return;
}

function counterneurCount(str) {
  let tbl = [{ val: [str[0]], last: str[0].charCodeAt(0), max: 1 }];
  for (let i = 0; i < str.length; i++) {
    const current = str[i].charCodeAt(0);
    goUpdtate(tbl, current);
  }
  return tbl.length;
}
for (let i = 0; i < N; i++) {
  const line = readline();
  console.log(counterneurCount(line));
}
