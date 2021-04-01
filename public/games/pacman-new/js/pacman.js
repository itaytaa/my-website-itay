var PACMAN = 'P'
var img=  '<img class="pacman" src="gila.png" alt="gila">'


var direction='up';
var cherryScore=0;



function createPacman(board) {

  var pacman = {
    location: { i: 5, j: 8 },
    isSuper: false
  }

  gPacman = pacman
// debugger
  board[gPacman.location.i][gPacman.location.j] = PACMAN
  console.table(gBoard)
}


function movePacman(eventKeyBoard) {

  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(eventKeyBoard)
  if (!nextLocation) return;
  if (nextLocation === WALL) return;
  if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
    gameOver()
    return;
  }
 
    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    if (nextCell === WALL) return;



    if (nextLocation === GHOST) {
      if (!gPacman.isSuper){

        renderCell(nextLocation, EMPTY)
      alert('game over')
      }
      
    }
    


    if (nextCell === FOOD) {
      gGame.score++;
      updateScore()
    }

    if (nextCell === SUPER) {
      gPacman.isSuper=true;
      flashTitle()
      setTimeout(() => {
        gPacman.isSuper=false;
        console.log('timeout')
      }, 10000);
      cherryScore+=10
      updateScore()
      flashScore()
    }
    
    if (gGame.score === 82) {
      alert('you win with score of: '+gTotalScore)
      gameOver()
      gGame.isOn = false;
      console.log(nextLocation)
      init()
      return;
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY)
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    renderCell(nextLocation, img)
    // debugger
  //     elpacman=document.querySelector(`.pacman`);
  // console.log(elpacman)

 

}





function getNextLocation(keyBoardEvent) {

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyBoardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
 direction='up';
      break;
    case 'ArrowDown':
      nextLocation.i++;
      direction='down';
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      direction='left';
      break;
    case 'ArrowRight':
      nextLocation.j++;
      direction='right';
      break;
    default: return null;

  }
  return nextLocation;

}

function updateScore(){
var scoreBox=document.querySelector(".score");
gTotalScore=gGame.score+cherryScore;
scoreBox.innerText='score: '+gTotalScore;

}

function flashScore(){

  
  // debugger
  var scoreBox=document.querySelector(".score");

  scoreBox.style.animation='blinker 0.5s linear infinite';
  setTimeout(() => {
    scoreBox.style.animation='none'
  }, 2500);
}

function flashTitle(){

  
  // debugger
  var scoreBox=document.querySelector("h1");

  scoreBox.style.animation='blinker 0.5s linear infinite';
  setTimeout(() => {
    scoreBox.style.animation='none'
  }, 10000);
}
