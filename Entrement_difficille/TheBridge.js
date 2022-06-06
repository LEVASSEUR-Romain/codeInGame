let map = [];
const M = parseInt(readline()); // the amount of motorbikes to control
const V = parseInt(readline()); // the minimum amount of motorbikes that must survive
map.push(readline());
map.push(readline());
map.push(readline());
map.push(readline());
const action = {
  s: "SPEED", //pour augmenter la vitesse des motos de 1.
  sl: "SLOW", //pour diminuer la vitesse des motos de 1.
  j: "JUMP", //pour sauter.
  w: "WAIT", //pour aller tout droit à la vitesse courante.
  u: "UP", // pour faire monter les motos d'une voie.
  d: "DOWN", //pour faire descendre les motos d'une voi
};
const analyseMap = [];
for (let y = 0; y < map.length; y++) {
  const count = [...map[y].matchAll(/(0){1,}/g)];
  for (let i = 0; i < count.length; i++) {
    analyseMap.push({ x: count[i]["index"], y: y, s: count[i][0].length + 1 });
  }
}
console.error(analyseMap);
const controleReturn = (moto) => {
  let motoSpeedNull = 0;
  for (let i = 0; i < moto.length; i++) {
    if (moto[i].s < 3) {
      motoSpeedNull++;
    }
    console.error(moto[i]);
    const trou = analyseMap.filter(
      (e) =>
        e.y === moto[i].y && e.x <= moto[i].x + moto[i].s && e.x >= moto[i].x
    );
    if (trou.length !== 0) {
      return action.j;
    }
  }
  // si toutes les moto non pas de speed
  if (motoSpeedNull === M) return action.s;
  return action.w;
};
// error
console.error(map);
console.error(M, "m", V, "v");
// game loop
while (true) {
  const S = parseInt(readline()); // the motorbikes' speed
  const moto = [];
  console.error(S, "speed");
  for (let i = 0; i < M; i++) {
    var inputs = readline().split(" ");
    const X = parseInt(inputs[0]); // x coordinate of the motorbike
    const Y = parseInt(inputs[1]); // y coordinate of the motorbike
    const A = parseInt(inputs[2]); // indicates whether the motorbike is activated "1" or detroyed "0"
    moto.push({ x: X, y: Y, a: A, s: S });
  }
  console.log(controleReturn(moto));
}
