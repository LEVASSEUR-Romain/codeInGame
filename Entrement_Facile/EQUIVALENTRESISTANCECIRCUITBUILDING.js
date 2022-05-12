const N = parseInt(readline());
const value = {};
for (let i = 0; i < N; i++) {
  var inputs = readline().split(" ");
  const name = inputs[0];
  const R = parseInt(inputs[1]);
  value[name] = R;
}
const saveCircuit = readline();
let circuit = saveCircuit;
for (const i in value) {
  circuit = circuit.replaceAll(i, value[i]);
}

while (circuit.match(/[[]|[(]/)) {
  // circuit en serie
  let serieMatches = circuit.match(/[(]([0-9 .]{1,})[)]/g);
  if (serieMatches) {
    const match = serieMatches[0].split(" ");
    let total = 0;
    for (let i = 1; i < match.length - 1; i++) {
      total += parseFloat(match[i]);
    }
    circuit = circuit.replace(serieMatches[0], total);
  }
  // circuit en parrallele
  let parralMatches = circuit.match(/[[]([0-9 .]{1,})]/g);
  if (parralMatches) {
    const match = parralMatches[0].split(" ");
    let total = 0;
    for (let i = 1; i < match.length - 1; i++) {
      total += 1 / parseFloat(match[i]);
    }
    total = 1 / total;
    circuit = circuit.replace(parralMatches[0], total);
  }
}
console.log((Math.round(circuit * 10) / 10).toFixed(1));
