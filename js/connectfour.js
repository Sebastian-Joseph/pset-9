// JavaScript Document
var pColor = "red";
var player1 = true;
var win1 = false;
var win2 = false;

//Creates variable to hold objects of the square class
var square = document.getElementsByClassName("square");

//Sets value for background color
for(var j =0; j < square.length; j++){
	square[j].style.backgroundColor = "white";
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

function changeColor(id){
	//Checks for players turn and verifies that the select square is empty
	if(player1 == true && document.getElementById(id).style.backgroundColor != "red" && document.getElementById(id).style.backgroundColor != "black"){
	document.getElementById("message").innerHTML = "";
	pColor = "red";
	document.getElementById(id).style.backgroundColor = pColor;
	id.value = "red";
	verticalWinCheck(pColor);
	horizontalWinCheck(pColor);
	diagonalWinCheck(pColor);
	player1 = false;
	document.getElementById("turn").innerHTML = "Player 2's Turn";
	return player1;
}

	//Checks for players turn and verifies that the select square is empty
	else if(player1 == false && document.getElementById(id).style.backgroundColor != "black" && document.getElementById(id).style.backgroundColor != "red"){
	document.getElementById("message").innerHTML = "";
	pColor="black";
	document.getElementById(id).style.backgroundColor = pColor;
	verticalWinCheck(pColor);
	horizontalWinCheck(pColor);
	diagonalWinCheck(pColor);
	player1 = true;
	document.getElementById("turn").innerHTML = "Player 1's Turn";
	return player1;
}
	else{
		//Displays message if the selected square has already been selected.
		document.getElementById("message").innerHTML = "Message: Choose another square!";
	}
}
