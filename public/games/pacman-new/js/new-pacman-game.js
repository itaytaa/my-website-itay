'use strict';
var WALL = '#';
var FOOD = '•';
var EMPTY = ' ';
var img = '<img  class="pacman" src="pac-man.png" alt="pac"/>'
var SUPER='🍒'
var gTry = 3;
var gGame = {
    score: 0,
    isOn: false
}
var gBoard;
var gPacman;
var gGhosts;
var gIntervalGhost;
var gIntervalSuperFood;
var gTotalScore

function init() {
    gGame.isOn = true;
    gGame.score = 0;
    gBoard = createBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    renderBoard(gBoard)
cherryScore=0;

    gIntervalGhost = setInterval(() => {
        moveGhosts();

    }, 500);

    gIntervalSuperFood=setInterval(() => {
        superFood()
    }, 8000);
}

function playAgain() {
    gGame.isOn = true;
    gBoard[gPacman.location.i][gPacman.location.j] = ' ';
    for (var i = 0; i < gGhosts.length; i++) {
        gBoard[gGhosts[i].location.i][gGhosts[i].location.j] = gGhosts[i].currCellContant;

    }
    gGhosts = [];

    createPacman(gBoard);
    createGhosts(gBoard);
    renderBoard(gBoard)
    gIntervalGhost = setInterval(() => {
        moveGhosts();

    }, 800);
}


function createBoard() {
    var size = 13;
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || i > 6 && i < 10 && j > 1 && j < 3 ||
                i > 4 && i < 6 && j > 1 && j < 5 || i > 4 && i < 9 && j > 4 && j < 6 || i > 1 && i < 3 && j > 3 && j < 8 ||
                i < 9 && i > 7 && j > 4 && j < 8 || i < 5 && i > 2 && j > 6 && j < 8 || i < 8 && i > 10 && j > 2 && j < 4 ||
                i > 8 && i < 11 && j > 2 && j < 4 || i < 11 && i > 9 && j > 3 && j < 11 || i > 2 && i < 8 && j > 8 && j < 10 ||
                i > 6 && i < 11 && j > 9 && j < 11) {
                board[i][j] = WALL


            }

        }

    }


    console.table(board)
    return board
}

function renderBoard(board) {

    var strHtml = '<table border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j];
            var className = (cell === WALL) ? 'wall cell' + i + '-' + j : 'cell cell' + i + '-' + j;
            if (board[i][j] === PACMAN) {
                cell = img;
            }
            strHtml += `<td class="${className}" >${cell}</td>`
        }
        strHtml += '</tr>'
    }
    strHtml += '</tbody></table>'
    document.querySelector('.game-area').innerHTML = '';
    document.querySelector('.game-area').innerHTML = strHtml;
}


function gameOver() {
    clearInterval(gIntervalGhost)
    if (gGame.score < 82) {

        gTry--
        if (gTry > 0) {
            alert('you got ' + gTry + ' more chances');
            playAgain()
        } else {
            var restart = confirm('Sorry, you lost. play again?');
            if (restart) {
                gTry = 3
                init()
            } else {
                gGame.isOn = false
            }
            return
        }

    }
    return;
}





function superFood() {
    
var emptyCells=findempty()
if (emptyCells.length===0)return;
var randomLoc=emptyCells[ getRandomIntInclusive(0,emptyCells.length-1)]
console.log(randomLoc);
gBoard[randomLoc.i][randomLoc.j]=SUPER;
// debugger
renderCell(randomLoc,SUPER)
}

function findempty(){

    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i: i, j: j })
            }
        }
    }
    return emptyCells
}