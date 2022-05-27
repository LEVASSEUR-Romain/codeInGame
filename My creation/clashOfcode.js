//https://www.codingame.com/contribute/view/180339fc604cea15b81d57790fa82265b48ac
const T = [];
for (let i = 0; i < 4; i++) {
  const number = readline();
  T.push(number);
}
const rarith = T[1] - T[0];
const rgeom = T[1] / T[0];
const arith = T.reduce((a, b) => {
  if (b - a === rarith) return b;
  return false;
});
const geom = T.reduce((a, b) => {
  if (rgeom * a == b) return b;
  return false;
});

if (arith !== false && rarith >= 0) console.log("U(n+1) = U(n) + " + rarith);
else if (arith !== false && rarith <= 0)
  console.log("U(n+1) = U(n) - " + -rarith);
else if (geom !== false) console.log("U(n+1) = U(n) * " + rgeom);
else console.log(false);
