const morse = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
};
let tailleMinimum = 0;
let tailleMax = 0;
function traductionEnMorse(mot) {
  let traductionEnCours = "";
  for (let i = 0; i < mot.length; i++) {
    traductionEnCours += morse[mot[i]];
  }
  return traductionEnCours;
}

function recursiveRecherchelaSuite(str, mot, index) {
  if (index === str.length) {
    return 1;
  }
  let score = 0;
  for (let i = index; i < str.length + 1; i++) {
    const findIndex = mot[str.substring(index, i)];
    if (findIndex !== undefined) {
      score += findIndex * recursiveRecherchelaSuite(str, mot, i);
    }
  }

  return score;
}

/* function solve(start, str, dp) {
  if (start === str.length) return 1;

  if (dp[start] !== undefined) return dp[start];

  var res = 0;
  for (var i = 1; i <= 80 && start + i <= str.length; i++) {
    var n = words[str.substr(start, i)];
    if (n !== undefined) res += n * solve(start + i, str, dp);
  }
  return (dp[start] = res);
} */

const dicoMorseIndex = {};
const codeMorse = readline();
console.error(codeMorse.length, "taille");
const tailleMorse = codeMorse.length;
const N = parseInt(readline());
for (let i = 0; i < N; i++) {
  const traductionLigne = traductionEnMorse(readline());
  if (traductionLigne.length <= tailleMorse) {
    if (tailleMinimum === 0) tailleMinimum = traductionLigne.length;
    if (tailleMax === 0) tailleMax = traductionLigne.length;
    if (
      traductionLigne.length < tailleMinimum &&
      traductionLigne.length <= codeMorse.length
    )
      tailleMinimum = traductionLigne.length;
    if (traductionLigne.length > tailleMax) tailleMax = traductionLigne.length;
    if (dicoMorseIndex[traductionLigne] === undefined) {
      dicoMorseIndex[traductionLigne] = 1;
    } else {
      dicoMorseIndex[traductionLigne]++;
    }
  }
}
let count = 0;
let motCrypter = codeMorse;
let saveScore = {};
let avancementMin = 0;
let newPosition = 0;

while (motCrypter.length != 0) {
  for (let i = tailleMinimum; i < tailleMax + 1; i++) {
    const findIndex = dicoMorseIndex[motCrypter.substring(0, i)];
    if (findIndex !== undefined) {
      if (saveScore[i + newPosition] === undefined) {
        saveScore[i + newPosition] = findIndex;
      } else {
        saveScore[i + newPosition] = saveScore[i + newPosition] + findIndex;
      }
    }
  }
  const tailleASuprimer = Object.keys(saveScore)[avancementMin];
  motCrypter = codeMorse.substring(tailleASuprimer);
  avancementMin = avancementMin + 1;
  newPosition = parseInt(tailleASuprimer);
}

//additionner tous les scores
console.error(saveScore);
const final = Object.values(saveScore).reduce((a, b) => a * b);

console.log(final);
