'using sctrict';

var interval;
var gCars;

init();

function init() {

    gCars = [
        { model: 'Green', distance: 0, speed: 5 },
        { model: 'Yellow', distance: 0, speed: 5 }
    ]


}

function startRace() {

    var interval = setInterval(() => {
        var elCars = document.querySelectorAll('.car')
        for (var i = 0; i < elCars.length; i++) {
            var elCar = elCars[i];
            var car = gCars[i];
            car.distance += car.speed;
            elCar.style.marginLeft = car.distance + "px";
            console.log(gCars[i].model, gCars[i].distance)
            if (gCars[i].distance > 1200) {
                debugger 
                gameOver(gCars[i])
                return;
            }
        }
    }, 100);


}


function gameOver(car) {
    alert(`${car.model} car has won!`)
    var restart = confirm('Restart Game?')
    if (restart) {
        restartGame();
    } else {
        debugger
     return;
    }
}

function restartGame() {
   

    var elCars = document.querySelectorAll('.car')
    for (var i = 0; i < elCars.length; i++) {
        var elCar = elCars[i];
        var car = gCars[i];
        car.distance = 0;
        elCar.style.marginLeft = car.distance + "px";

    } 
    init();
    clearInterval(interval);

}

function speedCar(carIdx, diff = 5) {
    gCars[carIdx].speed += diff;

}