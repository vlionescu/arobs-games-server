var origBoard;
var ch1 = document.getElementById("choise1");
var ch2 = document.getElementById("choise2");
var ch3 = document.getElementById("choise3");
var ch4 = document.getElementById("choise4");
let humanPlayer = 'O';
let aiPlayer = 'X';
ch1.addEventListener('click', (e) => {
    humanPlayer = 'X';
    aiPlayer = 'O';
    ch1.disabled = true;
    ch2.disabled = true;

});
ch2.addEventListener('click', (e) => {
    humanPlayer = 'O';
    aiPlayer = 'X';
    ch1.disabled = true;
    ch2.disabled = true;
});

var winHuman;
var winComputer;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

let gameWon;

winHuman = 0;
winComputer = 0;


const cells = document.querySelectorAll('.cell'); // cells variable is going to store a reference to each element that has a class 'cell'
startGame(); // calling function to start the game

function reset(){
    location.reload();
};


function startGame() {

    document.querySelector(".endgame").style.display = "none"
    origBoard = Array.from(Array(9).keys())
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = ''; //there will be nothing in the cell
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}


function turnClick(square) {
    if (typeof origBoard[square.target.id] === 'number') {
        turn(square.target.id, humanPlayer);
        if (!checkTie()) turn(bestSpot(), aiPlayer);
    }
}


//defining turn function
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}


function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}


//defining gameOver function
function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player === humanPlayer ? "#4da6ff" : "#ff0000";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player === humanPlayer ? "You win!" : "You lose.");

    if (gameWon.player === humanPlayer) {
        winHuman++;
        document.getElementById('player1').innerText = winHuman;
    } else {
        winComputer++;
        document.getElementById('player2').innerText = winComputer;
    }


}


//defining declareWinner function
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

//defining emptySuares function
function emptySquares() {
    return origBoard.filter(s => typeof s === 'number');
}


//easy/hard event listeners
let easyMode = true;

ch3.addEventListener('click', (e) => {
    easyMode = true;
});
ch4.addEventListener('click', (e) => {
    easyMode = false;

});

//defining bestSpot function
function bestSpot() {
   if (easyMode) {
       return emptySquares()[0];
   } else {
       return minimax(origBoard, aiPlayer).index;
   }

}


//defining checkTie function
function checkTie() {
    if (emptySquares().length === 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "#66ff66";
            cells[i].removeEventListener('click', turnClick, false);
        }
        console.log(gameWon);
        if (!gameWon)
            declareWinner("Tie Game!")
        return true;
    }
    return false;
}


function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard);

    if (checkWin(newBoard, player)) {
        return {score: -10};
    } else if (checkWin(newBoard, aiPlayer)) {
        return {score: 10}
    } else if (availSpots.length === 0) {
        return {score: 0}
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player === aiPlayer) {
            var result = minimax(newBoard, humanPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else { // when human Player
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}