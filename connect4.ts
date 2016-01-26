
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

ready(main);

function main(){
	newGame();

	var button1 = document.getElementById("b1");
	var button2 = document.getElementById("b2");
	var button3 = document.getElementById("b3");
	var button4 = document.getElementById("b4");
	var button5 = document.getElementById("b5");
	var button6 = document.getElementById("b6");
	var button7 = document.getElementById("b7");
	var buttonR = document.getElementById("reset");

	//button events
	button1.onclick = function() { play(player, board, 0); };
	button2.onclick = function() { play(player, board, 1); };
	button3.onclick = function() { play(player, board, 2); };
	button4.onclick = function() { play(player, board, 3); };
	button5.onclick = function() { play(player, board, 4); };
	button6.onclick = function() { play(player, board, 5); };
	button7.onclick = function() { play(player, board, 6); };
	buttonR.onclick = function() { location.reload(); }

	var board: number[][] = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
	var player: number = 1;
	var col: number = 0;
	var count: number = 0;
	var check: number = 0;
	//start new game
	function newGame() {
		board = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
	};

	function disableButtons(){
		for (var i = 1; i < 8; i++){
			document.getElementById("b"+i).style.pointerEvents = "none";
			document.getElementById("b"+i).style.cursor = "default";
			document.getElementById("b"+i).style.background = "background: #34666c";
		}
	};

	//board printing for test purposes
	function printBoard(board:number[][]){
		for (var i = 0; i < 6; i++) {
			var s = "";
			for (var j = 0; j < 7; j++) {
				s += board[i][j];
				s += " ";
			}
			alert(s);
		}
		//console.log("1 2 3 4 5 6 7");
	};

	function play(player: number, board: number[][], col: number) {
		count++;
		for (var i = 0; i < 6; i++) {
			if (i == 0 && board[i][col] != 0) { //false move bruh?
				alert("Nice try, guy. This column is full.");
				count--;
				break;
			}
			else {
				if ((count % 2) != 0) {
					player = 2;
				}
				else {
					player = 1;
				}
			}
			if (i <= 4) {
				if (board[i + 1][col] != 0) { //if the space below isn't a zero, then set the disc color thing
					board[i][col] = player;
					//set the disc
					var element: string = String(i * 7 + col + 1);
					if((count % 2) != 0){
						document.getElementById(element).style.background = "#3A2E39";
						document.getElementById("p1").innerHTML = "Player Two";
						check = checkForWin(board, i, col);
						if (check != 0){
							if (check == 1){
								alert("Player two wins!");
							}
							else{
								alert("Player one wins!");
							}
							disableButtons();
						}
						break;
					}
					else{
						document.getElementById(element).style.background = "#F15152";
						document.getElementById("p1").innerHTML = "Player One";
						check = checkForWin(board, i, col);
						if (check != 0) {
							if (check == 1) {
								alert("Player two wins!");
							}
							else {
								alert("Player one wins!");
							}
							disableButtons();
						}
						break;
					}
				}
				else{
					board[i][col] = 0;
				}
			}
			else{ //got to the bottom disc, rest of board must be empty ya derp
				board[i][col] = player;
				//set the disc thing
				var element: string = String(i * 7 + col + 1);
				if ((count % 2) != 0) {
					document.getElementById(element).style.background = "#3A2E39";
					document.getElementById("p1").innerHTML = "Player Two";
					check = checkForWin(board, i, col);
					if (check != 0) {
						if (check == 1) {
							alert("Player two wins!");
						}
						else {
							alert("Player one wins!");
						}
						disableButtons();
					}
				}
				else{
					document.getElementById(element).style.background = "#F15152";
					document.getElementById("p1").innerHTML = "Player One";
					check = checkForWin(board, i, col);
					if (check != 0) {
						if (check == 1) {
							alert("Player two wins!");
						}
						else {
							alert("Player one wins!");
						}
						disableButtons();
					}
				}
			}
		}
		//printBoard(board);
	};


	function checkLine(a, b, c, d) {
		// Check first cell non-zero and all cells match
		return ((a != 0) && (a == b) && (a == c) && (a == d));
	};
	//magic voodoo logic
	function checkForWin(bd: number[][], r: number, c: number) {
		// Check vertical
		for (r = 0; r < 3; r++)
			for (c = 0; c < 7; c++)
				if (checkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c]))
					return bd[r][c];

		// Check horizontal
		for (r = 0; r < 6; r++)
			for (c = 0; c < 4; c++)
				if (checkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3]))
					return bd[r][c];

		// Check down-right
		for (r = 0; r < 3; r++)
			for (c = 0; c < 4; c++)
				if (checkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2], bd[r + 3][c + 3]))
					return bd[r][c];

		// Check down-left
		for (r = 3; r < 6; r++)
			for (c = 0; c < 4; c++)
				if (checkLine(bd[r][c], bd[r - 1][c + 1], bd[r - 2][c + 2], bd[r - 3][c + 3]))
					return bd[r][c];

		return 0;
	};

};



