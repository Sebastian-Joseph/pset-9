let player1 = prompt("Player One: Enter Your Name , you will be Blue");
let player1color = 'rgb(86, 151, 255)';

let player2 = prompt("Player Two: Enter Your Name, you will be Red");
let player2color = 'rgb(237, 45, 73)';

let gameon = true;
let table = $('table tr');

function reportWin(rowNum, colNum) {
  console.log("You won starting at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
  return
}

function returnColor(rowIndex, colIndex, color) {
  return
}

function checkBottom(colIndex) {
  let colorReport = returnColor(5, colIndex);
  for (let row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one != 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))) {
        console.log('horiz');
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))) {
        console.log('vertical');
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  for (let col = 0; col < 5; col++) {
    for (let row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3))) {
        console.log('diag');
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}
