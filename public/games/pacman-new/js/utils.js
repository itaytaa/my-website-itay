console.log('hi')


function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`)
    elCell.style.transform = 'scaleX(1)';
    elCell.innerHTML = value;
   
    if(value!==ghostImg&& value!==FOOD){
//  debugger
   
    if (value === img) {
        flipPacmen(elCell)
    } }
}





function flipPacmen(elCell) {
    if (direction === 'left') {
        elCell.style.transform = 'scaleX(-1)';
    } else if (direction === 'right') {
        elCell.style.transform = 'scaleX(1)';
    } else if (direction === 'down') {
        elCell.style.transform = 'scaleX(-1) rotate(90deg)';
    } else {
        elCell.style.transform = 'scaleX(1) rotate(-90deg)';
    }

}


function findEmptyCells(location) {
    
    var gEmptyCells = []
    // debugger
    for (var i = location.i - 1; i <= location.i + 1; i++) {
        for (var j = location.j - 1; j <= location.j + 1; j++) {
            if (((i < location.i && j === location.j) ||
                (j > location.j && i === location.i) ||
                (i > location.i && j === location.j) ||
                (j < location.j && i === location.i)) &&
                (gBoard[i][j] !== WALL) && (gBoard[i][j] !== GHOST)) {
                gEmptyCells.push({ i, j });

            }
        }
    }
    return gEmptyCells;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}