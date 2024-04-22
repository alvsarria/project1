console.log("Hello World! I am alive!");

let frameCounter = 0;
const arrayDirection = [false, false, false, false];

const gameAreaElement = document.querySelector("#game-area");
const playerElement = new gamePlayer(gameAreaElement);


function gameLoop() {
    // Add here all the movement that is going to be trigered on each frame
    frameCounter++;
    // enemiesArray.forEach((enemy) => {
    //   enemy.move();
    // });
    // collissionCheck();
    playerElement.move();
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.key === "w") {
        arrayDirection[0] = true;
        playerElement.direction = 'up';
        playerElement.movementState = true;
    } else if (keyEvent.key === "s") {
        arrayDirection[1] = true;
        playerElement.direction = 'down';
        playerElement.movementState = true;
    } else if (keyEvent.key === "a") {
        arrayDirection[2] = true;
        playerElement.direction = 'left';
        playerElement.movementState = true;
    } else if (keyEvent.key === "d") {
        arrayDirection[3] = true;
        playerElement.direction = 'right';
        playerElement.movementState = true;
    };
});


document.addEventListener("keyup", (keyEvent) => {
    if (keyEvent.key === "w") {
        arrayDirection[0] = false;
    } else if (keyEvent.key === "s") {
        arrayDirection[1] = false;
    } else if (keyEvent.key === "a") {
        arrayDirection[2] = false;
    } else if (keyEvent.key === "d") {
        arrayDirection[3] = false;
    };

    if (arrayDirection.every(element => element === false)) {
        playerElement.movementState = false;
        console.log(playerElement.x, playerElement.y)
    } else if (arrayDirection.indexOf(true) === 0){
        playerElement.direction = 'up';
    } else if (arrayDirection.indexOf(true) === 1){
        playerElement.direction = 'down';
    } else if (arrayDirection.indexOf(true) === 2){
        playerElement.direction = 'left';
    } else if (arrayDirection.indexOf(true) === 3){
        playerElement.direction = 'right';
    };
});