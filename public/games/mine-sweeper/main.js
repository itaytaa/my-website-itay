'use strict';

var chances = 0;
var gBoard;
const MINE = '&#128163';
const FLAG = '&#128681'
var gLevel = {
    SIZE: 0,
    MINES: 0
};
var count;

var gGame = {
    isOn: false,
    shownCount: 0, markedCount: 0, secsPassed: 0
}


function initGame(size) {
    chances = 0;
    count = 0;
    gBoard = buildBoard(size);
    renderBoard(gBoard);
    if (size === 16) {
        gLevel.SIZE = 16;
        gLevel.MINES = 2;
    }
    if (size === 64) {
        gLevel.SIZE = 64;
        gLevel.MINES = 12;
    }
    if (size === 144) {
        gLevel.MINES = 30;
        gLevel.SIZE = 144;
    }
    gGame = {
        isOn: false,
        shownCount: 0, markedCount: 0, secsPassed: 0
    }
    document.querySelector('.life1').style.display ="inline";
    document.querySelector('.life2').style.display ="inline";
    document.querySelector('.life3').style.display ="inline";

}

function buildBoard(size) {
    var board = [];
    for (var i = 0; i < Math.sqrt(size); i++) {
        board[i] = []
        for (var j = 0; j < Math.sqrt(size); j++) {
            board[i][j] = {
                minesAroundCount: 0,
                i: i,
                j: j,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }



    console.table(board);
    return board;
}



function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) {
                var mineCell = { i: i, j: j }
                checkNeighbours(board, mineCell);

            }

        }
    }
}

function checkNeighbours(board, pos) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (!checkIfOnBoard(board, { i: i, j: j })) continue;
            if (!board[i][j].isMine) board[i][j].minesAroundCount++

        }
    } console.log('added count around :', pos);
}




function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            
            var cell = board[i][j];
            
            var colors = ['black', 'blue', 'green']
            var color = colors[cell.minesAroundCount];


            strHtml += `<td oncontextmenu="cellMarked(this,${i},${j})" class="cell ${i}-${j}" data-id=${i},${j} `;
            if (cell.minesAroundCount === 1) {
                strHtml += ' style="color:blue" ';
            }
            if (cell.minesAroundCount === 2) {
                strHtml += ' style="color:green" ';
            }
            if (cell.minesAroundCount === 3) {
                strHtml += ' style="color:red" ';
            }
            if (cell.minesAroundCount === 4) {
                strHtml += ' style="color:orange" ';
            }
            if (cell.isShown) {
                strHtml += 'id="shown"';
            }
            strHtml += `onclick="cellClicked(this,${i},${j})">`;
            if (cell.isMine && cell.isShown) {
                strHtml += MINE;
            }
            if (cell.isMarked) {

                strHtml += FLAG;
            } else if
                (cell.minesAroundCount > 0 && cell.isShown) {
                strHtml += cell.minesAroundCount;


            } else {
                strHtml += '';
            }

            strHtml += `</td>`
        }
        strHtml += '</tr>';
    } 
    var elMat = document.querySelector('tbody')
    elMat.innerHTML = strHtml;
}





function cellClicked(e, i, j) {
    gGame.isOn = true;
    count++
    if (count === 1) {
        setMines(i, j);
        setMinesNegsCount(gBoard)
        renderBoard(gBoard);
        expandShown(gBoard, gBoard[i][j], i, j)

    }

    if (gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true;


        renderBoard(gBoard);
        chances++
        if (chances === 1) {
            document.querySelector('.life1 ').style.display ="none";
            
            alert('you have 2 more chances');
        }
        if (chances === 2){
            if (gLevel.SIZE===16){
                alert('game over');
                initGame(16);
            }
            document.querySelector('.life2').style.display ="none";
            alert('you have 1 more chances');
        } 
        if (chances === 3){
            document.querySelector('.life2').style.display ="none";
          alert('you lost');
          initGame(16);
          return; 
        } 
    }
    if (gBoard[i][j].minesAroundCount > 0) {

        if (!gBoard[i][j].isShown) {
            gBoard[i][j].isShown = true;
            gGame.shownCount++
        }


        renderBoard(gBoard);

    } else {
        expandShown(gBoard, gBoard[i][j], i, j)

        gBoard[i][j].isShown = true;

        renderBoard(gBoard);

    }
    checkGameOver()
}



function setMines(locI, locJ) {
    var indexes = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[locI][locJ] === gBoard[i][j]) continue;
            indexes.push({ i: i, j: j })
        }
    }
    for (var i = 0; i < gLevel.MINES; i++) {

        var temp = indexes.splice(getRandomInt(indexes.length), 1)
        gBoard[temp[0].i][temp[0].j].isMine = true;
    }
}

function cellMarked(elCell, i, j) {
    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true;
        gGame.markedCount++
        elCell.innerHTML = FLAG;

    } else {
        gBoard[i][j].isMarked = false;
        elCell.innerHTML = '';
        gGame.markedCount--
    }
    checkGameOver();
    renderBoard(gBoard);
    return false;

}

function checkGameOver() {

    if (gLevel.SIZE - (gGame.markedCount + gGame.shownCount) === 0) {
        alert('you win')
        initGame(16);
        gGame.isOn = false;
    }

}

function expandShown(board, elCell, i, j) {

    var cell = board[i][j]
    for (var i = cell.i - 1; i <= cell.i + 1; i++) {
        for (var j = cell.j - 1; j <= cell.j + 1; j++) {

            if (!checkIfOnBoard(board, { i: i, j: j })) continue;
            if (board[i][j].isMine) continue;
            if (board[i][j].isMarked) continue;

            // debugger
            if (!board[i][j].isShown) {
                board[i][j].isShown = true;
                gGame.shownCount++
            }


            renderBoard(board);

        }
    }

}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



function checkIfOnBoard(board, pos) {
    return (pos.i >= 0 && pos.i < board.length && pos.j >= 0 && pos.j < board[pos.i].length);
}
