
var GHOST = '👻'
var ghostImg='<img  class="ghostImage" src="ghost.jpg" alt="ghost"/>'
// var gGhostcounter;

function createGhosts(board) {
    gGhosts = [];
     createGhost()
     setTimeout(createGhost,4000) 
     setTimeout(createGhost,6000)
    console.table(gBoard)
}

function createGhost() {
    var ghost = {
        location: { i: 1, j: 4 },
        currCellContant: FOOD
    };
    // gGhostcounter++
    gGhosts.push(ghost);
    
    gBoard[ghost.location.i][ghost.location.j] = ghostImg;
}


function moveGhosts() {

    for (var i = 0; i < gGhosts.length; i++) {
        var emptyCells = findEmptyCells(gGhosts[i].location)
        if (emptyCells===0)return;
        var nextCell = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)];
        if(gBoard[nextCell.i][nextCell.j]===gBoard[gPacman.location.i][gPacman.location.j]){
            if (!gPacman.isSuper){
                gameOver();
            return; 
            }
           return;
        }
        gGhosts[i].currCellContant = gBoard[nextCell.i][nextCell.j];
        gBoard[gGhosts[i].location.i][gGhosts[i].location.j] = gGhosts[i].currCellContant;
        renderCell(gGhosts[i].location, gBoard[nextCell.i][nextCell.j])
        gBoard[nextCell.i][nextCell.j] = GHOST
        renderCell(nextCell, ghostImg)
        gGhosts[i].location = nextCell
    }
}




