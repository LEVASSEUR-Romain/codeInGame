function and(a, b) {
  let r = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) r.push("_");
    else r.push(a[i]);
  }
  return r.join("");
}
function or(a, b) {
  let r = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) r.push("-");
    else r.push(a[i]);
  }
  return r.join("");
}
function xor(a, b) {
  let r = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) r.push("-");
    else r.push("_");
  }
  return r.join("");
}
function nand(a, b) {
  const andAB = and(a, b);
  let r = [];
  for (let i = 0; i < andAB.length; i++) {
    if (andAB[i] === "_") r.push("-");
    else r.push("_");
  }
  return r.join("");
}
function nor(a, b) {
  const orAB = or(a, b);
  let r = [];
  for (let i = 0; i < orAB.length; i++) {
    if (orAB[i] === "_") r.push("-");
    else r.push("_");
  }
  return r.join("");
}
function nxor(a, b) {
  const xorAB = xor(a, b);
  let r = [];
  for (let i = 0; i < xorAB.length; i++) {
    if (xorAB[i] === "_") r.push("-");
    else r.push("_");
  }
  return r.join("");
}

const n = parseInt(readline());
const m = parseInt(readline());
const signal = [];
const listOperation = [];
for (let i = 0; i < n; i++) {
  var inputs = readline().split(" ");
  const inputName = inputs[0];
  const inputSignal = inputs[1];
  signal.push({
    name: inputName,
    signal: inputSignal,
  });
}
for (let i = 0; i < m; i++) {
  var inputs = readline().split(" ");
  const outputName = inputs[0];
  const type = inputs[1];
  const inputName1 = inputs[2];
  const inputName2 = inputs[3];
  listOperation.push({
    outputName: outputName,
    type: type,
    inputName1: inputName1,
    inputName2: inputName2,
  });
}
listOperation.forEach((operation) => {
  switch (operation.type) {
    case "AND":
      operation.signal = and(
        signal.find((x) => x.name === operation.inputName1).signal,
        signal.find((x) => x.name === operation.inputName2).signal
      );
      break;
    case "OR":
      operation.signal = or(
        signal.find((x) => x.name === operation.inputName1).signal,
        signal.find((x) => x.name === operation.inputName2).signal
      );
      break;
    case "XOR":
      operation.signal = xor(
        signal.find((x) => x.name === operation.inputName1).signal,
        signal.find((x) => x.name === operation.inputName2).signal
      );
      break;
    case "NAND":
      operation.signal = nand(
        signal.find((x) => x.name === operation.inputName1).signal,
        signal.find((x) => x.name === operation.inputName2).signal
      );
      break;
    case "NOR":
      operation.signal = nor(
        signal.find((x) => x.name === operation.inputName1).signal,
        signal.find((x) => x.name === operation.inputName2).signal
      );
      break;
    case "NXOR":
      operation.signal = nxor(
        signal.find((x) => x.name === operation.inputName1).signal,
        signal.find((x) => x.name === operation.inputName2).signal
      );
      break;
  }
});

for (let i = 0; i < m; i++) {
  console.log(listOperation[i].outputName + " " + listOperation[i].signal);
}
