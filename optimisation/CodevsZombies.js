// game loop
const humainspeed = 1000;
while (true) {
  var inputs = readline().split(" ");
  const x = parseInt(inputs[0]);
  const y = parseInt(inputs[1]);
  let human = [];
  let zombie = [];
  const humanCount = parseInt(readline());
  for (let i = 0; i < humanCount; i++) {
    var inputs = readline().split(" ");
    const humanId = parseInt(inputs[0]);
    const humanX = parseInt(inputs[1]);
    const humanY = parseInt(inputs[2]);
    human.push({
      id: humanId,
      x: humanX,
      y: humanY,
      distance: Math.abs(x - humanX) + Math.abs(y - humanY),
    });
  }
  const zombieCount = parseInt(readline());
  for (let i = 0; i < zombieCount; i++) {
    var inputs = readline().split(" ");
    const zombieId = parseInt(inputs[0]);
    const zombieX = parseInt(inputs[1]);
    const zombieY = parseInt(inputs[2]);
    const zombieXNext = parseInt(inputs[3]);
    const zombieYNext = parseInt(inputs[4]);
    let tblrecap = [];
    human.forEach((human) => {
      const distanceZombieHuman = Math.floor(
        Math.abs(zombieX - human.x) + Math.abs(zombieY - human.y)
      );
      const distanceZombiePerso = Math.floor(
        Math.abs(zombieXNext - human.x) + Math.abs(zombieYNext - human.y)
      );
      const xavance = Math.abs(zombieX - zombieXNext) ** 2;
      const yavance = Math.abs(zombieY - zombieYNext) ** 2;
      const hypoance = Math.sqrt(xavance + yavance);
      const numberavance = Math.round(distanceZombieHuman / hypoance);
      tblrecap.push({
        id: human.id,
        disantceZombiePerso: distanceZombiePerso,
        distanceperso: human.distance / humainspeed,
        distance: numberavance,
      });
    });
    tblrecap.sort((a, b) => a.distance - b.distance);
    zombie.push({
      id: zombieId,
      x: zombieX,
      y: zombieY,
      xNext: zombieXNext,
      yNext: zombieYNext,
      humainproche: tblrecap[0].id,
      distancehumain: tblrecap[0].distance,
      distancepersoZombie: tblrecap[0].disantceZombiePerso,
      distancepersohumain: tblrecap[0].distanceperso,
    });
  }
  // constantes de jeu
  const deltahumanzombie = 2;
  const factor = 10;
  //console.error(human);
  //console.error(zombie);
  // Si il y a 1 humain
  if (human.length === 1) {
    console.error("conditions 1");
    console.log(human[0].x + " " + human[0].y);
  } else if (zombie.length > human.length + deltahumanzombie) {
    console.error("conditions 2");
    console.log(human[0].x + " " + human[0].y);
  } else if (zombie.length === human.length) {
    console.error("conditions 3");
    const tblzombie = zombie.filter(
      (zombie) => zombie.distancehumain >= zombie.distancepersohumain
    );
    if (tblzombie.length === 0) console.log(human[0].x + " " + human[0].y);
    else console.log(tblzombie[0].x + " " + tblzombie[0].y);
  } else {
    console.error("conditions 4");
    zombie.sort((a, b) => a.distancepersoZombie - b.distancepersoZombie);
    console.log(zombie[0].x + " " + zombie[0].y);
  }
}
