// Mes classes
class Base {
  health = 0;
  mana = 0;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xP = 0;
    this.yP = 0;
  }
  getAction() {
    //MOVE <x> <y> | WAIT; In later leagues: | SPELL <spellParams>
    if (this.x === this.xP && this.y === this.yP) {
      return "WAIT";
    }
    if (
      this.x !== this.xP &&
      this.y !== this.yP &&
      this.xP !== 0 &&
      this.yP !== 0
    ) {
      return "MOVE " + this.xP + " " + this.yP;
    }
  }
  setMove(x, y) {
    this.xP = x;
    this.yP = y;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Monster {
  constructor(id, health, x, y, vx, vy, nearBase, threatFor) {
    this.id = id;
    this.health = health;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.nearBase = nearBase;
    this.threatFor = threatFor;
  }
  isFocusMe() {
    if (this.nearBase === 0) {
      return false;
    }
    return true;
  }
}
class Enemy {
  constructor(id, health, vx, vy, x, y) {
    this.id = id;
    this.health = health;
    this.vx = vx;
    this.vy = vy;
    this.x = x;
    this.y = y;
  }
  setAll(health, vx, vy, x, y) {
    this.id = id;
    this.health = health;
    this.vx = vx;
    this.vy = vy;
    this.x = x;
    this.y = y;
  }
}

// function
function hypothenuse(x, y) {
  return Math.round((x * x + y * y) ** 0.5);
}

function tortue() {
  const multiplicateur = 40;
  // on positionne les joueurs
  tblHeroes[0].setMove(8 * multiplicateur, 32 * multiplicateur);
  tblHeroes[1].setMove(20 * multiplicateur, 20 * multiplicateur);
  tblHeroes[2].setMove(32 * multiplicateur, 8 * multiplicateur);
}

var inputs = readline().split(" ");
const baseX = parseInt(inputs[0]); // The corner of the map representing your base
const baseY = parseInt(inputs[1]);
const heroesPerPlayer = parseInt(readline()); // Always 3

const mybase = new Base(baseX, baseY);
const tblHeroes = [];
const tblMonster = [];
const tblEnemy = [];
// game loop
while (true) {
  for (let i = 0; i < 2; i++) {
    var inputs = readline().split(" ");
    const health = parseInt(inputs[0]); // Your base health
    const mana = parseInt(inputs[1]); // Ignore in the first league; Spend ten mana to cast a spell
    mybase.health = health;
  }
  const entityCount = parseInt(readline()); // Amount of heros and monsters you can see
  let numPlayer = 0;
  for (let i = 0; i < entityCount; i++) {
    var inputs = readline().split(" ");
    const id = parseInt(inputs[0]); // Unique identifier
    const type = parseInt(inputs[1]); // 0=monster, 1=your hero, 2=opponent hero
    const x = parseInt(inputs[2]); // Position of this entity
    const y = parseInt(inputs[3]);
    const shieldLife = parseInt(inputs[4]); // Ignore for this league; Count down until shield spell fades
    const isControlled = parseInt(inputs[5]); // Ignore for this league; Equals 1 when this entity is under a control spell
    const health = parseInt(inputs[6]); // Remaining health of this monster
    const vx = parseInt(inputs[7]); // Trajectory of this monster
    const vy = parseInt(inputs[8]);
    const nearBase = parseInt(inputs[9]); // 0=monster with no target yet, 1=monster targeting a base
    const threatFor = parseInt(inputs[10]); // Given this monster's trajectory, is it a threat to 1=your base, 2=your opponent's base, 0=neither

    if (type === 0) {
      tblMonster.push(
        new Monster(id, health, x, y, vx, vy, nearBase, threatFor)
      );
    }
    if (type === 1) {
      if (tblHeroes.length !== 3) {
        const player = new Player(x, y);
        console.error("Player const : " + player.x + " " + player.y);
        tblHeroes.push(player);
      } else {
        if (numPlayer === 2) numPlayer = 0;
        tblHeroes[numPlayer].setPosition(x, y);
        numPlayer = numPlayer + 1;
      }
    }
    if (type === 2) {
      if (tblHeroes.length !== 3) {
        tblEnemy.push(new Enemy(id, health, vx, vy, x, y));
      } else {
        if (numEnnemy === 2) numEnnemy = 0;
        tblEnemy[numEnnemy].setall(health, vx, vy, x, y);
        numEnnemy = numEnnemy + 1;
      }
    }
  }

  // on définie la stratégie
  tortue();
  for (let i = 0; i < heroesPerPlayer; i++) {
    console.log(tblHeroes[i].getAction());
  }
}
