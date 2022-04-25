const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const messageVersIndexDecallage = (
  message: string,
  nbrDecallage: number
): number[] => {
  const split = message.split("");
  const retour = [];
  for (let i = 0; i < split.length; i++) {
    retour.push(alphabet.indexOf(split[i]) + nbrDecallage + i);
  }
  return retour;
};

const decallageInverse = (tbl: number[], nbrDecallage: number): number[] => {
  const retour = [];
  for (let i = 0; i < tbl.length; i++) {
    let decallage = tbl[i] - nbrDecallage - i;
    while (decallage < 0) {
      decallage = decallage + alphabet.length;
    }
    retour.push(decallage);
  }
  return retour;
};

const messageEnTableauIndex = (
  message: string,
  rotor: string = alphabet
): number[] => {
  const split = message.split("");
  const retour = [];
  for (let i = 0; i < split.length; i++) {
    retour.push(rotor.indexOf(split[i]));
  }
  return retour;
};

const tableauIndexEnCode = (messageIndex: number[], rotor: string): string => {
  let retour = "";
  for (let i = 0; i < messageIndex.length; i++) {
    while (messageIndex[i] > rotor.length - 1) {
      messageIndex[i] = messageIndex[i] - rotor.length;
    }
    retour = retour + rotor[messageIndex[i]];
  }
  return retour;
};

const encode = (
  message: string,
  rotor: string[],
  nbrDecallage: number
): string => {
  let messageIndex = messageVersIndexDecallage(message, nbrDecallage);
  let newPass: string = "";
  for (let i = 0; i < rotor.length; i++) {
    newPass = tableauIndexEnCode(messageIndex, rotor[i]);
    messageIndex = messageEnTableauIndex(newPass);
  }
  return newPass;
};

const decode = (
  message: string,
  rotor: string[],
  nbrDecallage: number
): string => {
  let messageIndex = [];
  let newPass: string = "";
  for (let i = rotor.length - 1; i > -1; i--) {
    if (i === rotor.length - 1) {
      messageIndex = messageEnTableauIndex(message, rotor[i]);
    } else {
      messageIndex = messageEnTableauIndex(newPass, rotor[i]);
    }
    newPass = tableauIndexEnCode(messageIndex, alphabet);
  }
  messageIndex = decallageInverse(messageIndex, nbrDecallage);
  newPass = tableauIndexEnCode(messageIndex, alphabet);
  return newPass;
};

const operation: string = readline();
const pseudoRandomNumber: number = parseInt(readline());
const allRotor: string[] = [];
for (let i = 0; i < 3; i++) {
  const rotor: string = readline();
  allRotor.push(rotor);
}
const message: string = readline();
if (operation === "ENCODE") {
  console.log(encode(message, allRotor, pseudoRandomNumber));
} else {
  console.log(decode(message, allRotor, pseudoRandomNumber));
}
