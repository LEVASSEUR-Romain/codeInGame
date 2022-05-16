let grill = [];
function validateOnY() {
  for (let i = 0; i < grill.length; i++) {
    const unique = [...new Set(grill[i])];
    if (unique.length !== grill[i].length) {
      return false;
    }
  }
  return true;
}
function validateOnX() {
  let test = [];
  for (let x = 0; x < grill.length; x++) {
    test = [];
    for (let y = 0; y < grill.length; y++) {
      test.push(grill[y][x]);
    }
    const unique = [...new Set(test)];
    if (unique.length !== test.length) {
      return false;
    }
  }
  return true;
}
function validateOnBox() {
  let test = [];
  let i = 0;
  let x = 0;
  for (let y = 0; y < grill.length; y += 3) {
    for (let x = 0; x < 9; x += 3) {
      test[i] = [];
      test[i].push(grill[y][x]);
      test[i].push(grill[y][x + 1]);
      test[i].push(grill[y][x + 2]);
      test[i].push(grill[y + 1][x]);
      test[i].push(grill[y + 1][x + 1]);
      test[i].push(grill[y + 1][x + 2]);
      test[i].push(grill[y + 2][x]);
      test[i].push(grill[y + 2][x + 1]);
      test[i].push(grill[y + 2][x + 2]);
      i++;
    }
  }
  for (let j = 0; j < test.length; j++) {
    const unique = [...new Set(test[j])];
    if (unique.length !== test.length) {
      return false;
    }
  }
  return true;
}
for (let i = 0; i < 9; i++) {
  var inputs = readline().split(" ");
  grill.push([]);
  for (let j = 0; j < 9; j++) {
    const n = parseInt(inputs[j]);
    grill[i].push(n);
  }
}
console.log(validateOnY() && validateOnX() && validateOnBox());
