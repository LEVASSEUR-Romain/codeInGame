const n = parseInt(readline());
const translate = {};
let maxLength = 0;
for (let i = 0; i < n; i++) {
  var inputs = readline().split(" ");
  const b = inputs[0];
  const c = parseInt(inputs[1]);
  if (maxLength === 0) {
    maxLength = b.length;
  }
  if (b.length > maxLength) {
    maxLength = b.length;
  }
  translate[b] = String.fromCharCode(c);
}
let s = readline();
const lengthS = s.length;
function recusrive(word, save) {
  if (word.length === 0) {
    return save;
  }
  let find = false;
  for (let i = 0; i < maxLength; i++) {
    const spliceWord = word.slice(0, i + 1);
    if (translate[spliceWord]) {
      save.push(translate[spliceWord]);
      return recusrive(word.slice(i + 1), save);
      find = true;
    }
  }
  if (!find) {
    return lengthS - word.length;
  }
}
const end = recusrive(s, []);

console.log(Array.isArray(end) ? end.join("") : "DECODE FAIL AT INDEX " + end);
