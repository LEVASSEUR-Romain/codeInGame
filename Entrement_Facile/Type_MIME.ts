const readPoints = (text: string): string => {
  const regex = /\.([a-zA-Z0-9]+)$/;
  const extension = text.match(regex);
  if (extension) {
    console.error(extension[1].toLowerCase());
    return EXT_MT[extension[1].toLowerCase()]
      ? EXT_MT[extension[1].toLowerCase()]
      : "UNKNOWN";
  }
  return "UNKNOWN";
};

const N = parseInt(readline());
const Q = parseInt(readline());
const EXT_MT = {};
for (let i = 0; i < N; i++) {
  var inputs = readline().split(" ");
  const EXT = inputs[0];
  const MT = inputs[1];
  EXT_MT[EXT.toLowerCase()] = MT;
}
for (let i = 0; i < Q; i++) {
  const FNAME = readline();
  console.log(readPoints(FNAME));
}
