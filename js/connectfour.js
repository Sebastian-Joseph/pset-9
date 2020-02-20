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

function diagonal(pColor){
	//loops through each square in the grid.
	for(var t = 1;t < 26; t++){
		//Checks if the square is  on the bottom row
		if(t == 1 || t == 2 || t == 4 || t ==5){
			//Checks for the squares in the bottom right
			if(t == 1 || t == 2){
				if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 6)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 12)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 18)])).style.backgroundColor == pColor){
					console.log("win");
					document.getElementById("message").innerHTML = pColor + " Wins";
				}
			}//Checks for the squares in the bottom left
			else if(t == 4|| t==5){
				if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 4)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 8)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 12)])).style.backgroundColor == pColor){
					console.log("win");
					document.getElementById("message").innerHTML = pColor + " Wins";
				}
		}//Checks if the square is  on the top row
	}else if(t == 21 || t == 22 || t == 24 || t ==25){
			//Checks for the squares in the top left
			if(t == 25 || t == 24){
				if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 6)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 12)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 18)])).style.backgroundColor == pColor){
					console.log("win");
					document.getElementById("message").innerHTML = pColor + " Wins";
				}
			}//Checks for the squares in the top right
			else if(t == 21|| t==22){
				if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 4)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 8)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 12)])).style.backgroundColor == pColor){
					console.log("win");
					document.getElementById("message").innerHTML = pColor + " Wins";
				}
		}
	}
}
}
function horizontal(pColor){
	//loops through each square in the grid.
	for(var t = 1;t < 26; t++){
		//Checks if the square is on the left side of the grid
		if(t%5 == 0){
				if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 1)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 2)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 3)])).style.backgroundColor == pColor){
					console.log("win");
					document.getElementById("message").innerHTML = pColor + " Wins";
				}
		}//Checks if the square is on the left side of the grid
		else if(t%5 == 1){
			if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 1)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 2)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 3)])).style.backgroundColor == pColor){
					console.log("win");
					document.getElementById("message").innerHTML = pColor + " Wins";
				}
		}//Checks the bottom row.
		else if(t == 1){
			if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 1)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 2)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 3)])).style.backgroundColor == pColor){
					console.log("win");
					document.getElementById("message").innerHTML = pColor + " Wins";
				}
		}
}
}
function vertical(pColor){
//loops through each square in the grid.
for(var t = 1;t < 26; t++)
	if(t <= 10){
		//Check if square has a id less than or equal to 10
		if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 5)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t +  10)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t + 15)])).style.backgroundColor == pColor){
			console.log("win");
			document.getElementById("message").innerHTML = pColor + " Wins";
		}
	}
	//Check if square has a id greater than or equal to 15
	else if(t >=15){
		if(document.getElementById(String([t])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 5)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t -  10)])).style.backgroundColor == pColor && document.getElementById(String([parseInt(t - 15)])).style.backgroundColor == pColor){
			console.log("win");
			document.getElementById("message").innerHTML = pColor + " Wins";
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
	vertical(pColor);
	horizontal(pColor);
	diagonal(pColor);
	player1 = false;
	document.getElementById("turn").innerHTML = "Player 2's Turn";
	return player1;
}

	//Checks for players turn and verifies that the select square is empty
	else if(player1 == false && document.getElementById(id).style.backgroundColor != "black" && document.getElementById(id).style.backgroundColor != "red"){
	document.getElementById("message").innerHTML = "";
	pColor="black";
	document.getElementById(id).style.backgroundColor = pColor;
	vertical(pColor);
	horizontal(pColor);
	diagonal(pColor);
	player1 = true;
	document.getElementById("turn").innerHTML = "Player 1's Turn";
	return player1;
}
	else{
		//Displays message if the selected square has already been selected.
		document.getElementById("message").innerHTML = "Message: Choose another square!";
	}
}
