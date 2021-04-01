'use strict';

console.log('hello ballons')

var numsOfBalloons = 7;
var gBalloons;
var gCount = 0;
var gInterval;
var level;

function init() {
    level = +prompt('what level? 1-10')
    clearInterval(gInterval)
    resetGame();

    gBalloons = [];
    gCount = 0;
    gBalloons = createBallons();
    renderGame()
    gInterval = setInterval(moveBalloons, 80);
}



function createBallons() {
    var balloons = []
    for (var i = 0; i < numsOfBalloons; i++) {
        balloons.push(createBallon());
    }
    return balloons;
}

function createBallon() {
    return { bottom: 0, speed: getRandomIntInclusive(level, level * 3), isPoped: false }
}


function resetGame() {
    document.querySelector('.gameArea').innerHTML = '<button onclick="init()">התחל מחדש</button> <div class="counterBox">Balloons popped<span class="counter"> 0 </span></div>'
}

function renderGame() {
    var count = 0

    var body = document.querySelector('.gameArea');
    for (var i = 0; i < numsOfBalloons; i++) {
        body.innerHTML += `<div class="balloon${i} balloon" onclick="pop(${i})"> <img src="images/unnamed.png"/></div>`
        var currBalloon = document.querySelector(`.balloon${i}`);
        count += 150
        currBalloon.style.left = count + 'px';
    }
}




function pop(i) {

    gCount++;
    // debugger
    var counter = document.querySelector('.counter');
    counter.innerText = ' '+gCount+' ';
    var elballoon = document.querySelector(`.balloon${i}`)
    var audio = new Audio('pop-sound.mp3')
    audio.play();
    elballoon.style.transition = 'opacity 0.4s';
    elballoon.style.opacity = '0 ';
    elballoon.style.display = 'none';


    gBalloons[i].isPoped = true;

    gameOver();
}



function restartGame() {
    debugger
    clearInterval(gInterval)
    var restart = confirm('Play again?')
    if (restart) init();
    if (!restart) {

        alert('Thanks for playing');
    }

}

function isVictory(gCount) {

    if (gCount === numsOfBalloons) {

        debugger
        return true;
    }
    return false;
}


function gameOver(btm) {

    if (isVictory(gCount)) {
        debugger
        alert('You\'ve Won!');
        restartGame()
        return true;
    }
    if (btm > 660) {
        alert('sorry, you lost :(')
        restartGame()
        return true;
    }
    return false;
}





function moveBalloons() {

    var balloons = document.querySelectorAll(".balloon");
    for (var i = 0; i < balloons.length; i++) {
        if (gBalloons[i].isPoped) continue;
        console.log(balloons[i])
        var currBalloon = balloons[i];
        gBalloons[i].bottom += (gBalloons[i].speed)
        currBalloon.style.bottom = gBalloons[i].bottom + 'px';
        if (gameOver(gBalloons[i].bottom)) return;
    }

}




function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * max + min);
}