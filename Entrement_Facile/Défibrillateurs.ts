// utils
interface Position {
  lon: number;
  lat: number;
}
interface Defibrillateur {
  nom: string;
  position: Position;
  distance: number;
}
function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
function changeVirguleEnPoint(str: string): string {
  return str.replace(",", ".");
}

function calculeDistance(position1: Position, position2: Position): number {
  const x =
    (position2.lon - position1.lon) *
    Math.cos((position1.lat + position2.lat) / 2);
  const y = position2.lat - position1.lat;
  return Math.sqrt(x * x + y * y) * 6371;
}

const LON: string = readline();
const LAT: string = readline();
const myPosition: Position = {
  lon: degToRad(parseFloat(changeVirguleEnPoint(LON))),
  lat: degToRad(parseFloat(changeVirguleEnPoint(LAT))),
};
const defibri: Defibrillateur[] = [];
const N: number = parseInt(readline());
for (let i = 0; i < N; i++) {
  const DEFIB: string = readline();
  const tbl = DEFIB.split(";");
  const position: Position = {
    lon: degToRad(parseFloat(changeVirguleEnPoint(tbl[tbl.length - 2]))),
    lat: degToRad(parseFloat(changeVirguleEnPoint(tbl[tbl.length - 1]))),
  };
  const lieu: Defibrillateur = {
    nom: tbl[1],
    position: position,
    distance: calculeDistance(myPosition, position),
  };
  defibri.push(lieu);
}

const objFinal = defibri.reduce((acc, curr) => {
  if (acc.distance > curr.distance) {
    acc = curr;
  }
  return acc;
});

console.log(objFinal.nom);
