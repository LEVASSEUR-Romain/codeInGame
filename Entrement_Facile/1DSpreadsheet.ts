function operationAuto(
  a: number | string,
  b: number | string,
  operation: string
): number {
  switch (operation) {
    case "VALUE":
      if (typeof b === "number" && !isNaN(b)) {
        return b;
      }
      if (typeof a === "number" && !isNaN(a)) {
        return a;
      }
    case "ADD":
      if (
        typeof a === "number" &&
        typeof b === "number" &&
        !isNaN(a) &&
        !isNaN(b)
      ) {
        return a + b;
      }
    case "SUB":
      if (
        typeof a === "number" &&
        typeof b === "number" &&
        !isNaN(a) &&
        !isNaN(b)
      ) {
        return a - b;
      }
    case "MULT":
      if (
        typeof a === "number" &&
        typeof b === "number" &&
        !isNaN(a) &&
        !isNaN(b)
      ) {
        return a * b;
      }
  }
}
function estRempli(obj: object): boolean {
  for (let i in obj) {
    if (obj[i].value === false && obj[i].value !== 0) {
      return false;
    }
  }
  return true;
}

let allOperations = {};
const N: number = parseInt(readline());
for (let i = 0; i < N; i++) {
  var inputs: string[] = readline().split(" ");
  const operation: string = inputs[0];
  let arg1: string | number = inputs[1];
  let arg2: string | number = inputs[2];
  if (arg1 === "_") {
    arg1 = "";
  }
  if (arg2 === "_") {
    arg2 = "";
  }
  let ref1: number | false = false;
  let ref2: number | false = false;
  if (arg1.startsWith("$")) {
    ref1 = parseInt(arg1.substring(1));
    arg1 = "";
  } else {
    arg1 = parseInt(arg1);
  }
  if (arg2.startsWith("$")) {
    ref2 = parseInt(arg2.substring(1));
    arg2 = "";
  } else {
    arg2 = parseInt(arg2);
  }

  allOperations[i] = {
    operation: operation,
    arg1: arg1,
    arg2: arg2,
    value: false,
    ref1: ref1,
    ref2: ref2,
  };
}
let whileStop = true;
while (whileStop) {
  for (const i in allOperations) {
    const courant = allOperations[i];
    // si value deja rempli on fait rien
    if (courant.value === false) {
      if (courant.ref1 !== false) {
        courant.arg1 =
          allOperations[courant.ref1].value !== false
            ? allOperations[courant.ref1].value
            : courant.arg1;
      }
      if (courant.ref2 !== false) {
        courant.arg2 =
          allOperations[courant.ref2].value !== false
            ? allOperations[courant.ref2].value
            : courant.arg2;
      }
      if (courant.arg1 !== "" && courant.arg2 !== "") {
        courant.value = operationAuto(
          courant.arg1,
          courant.arg2,
          courant.operation
        );
      }
    }
    if (estRempli(allOperations)) {
      whileStop = false;
    }
  }
}

for (let i = 0; i < N; i++) {
  if (allOperations[i].value === -0) {
    allOperations[i].value = 0;
  }
  console.log(allOperations[i].value);
}
