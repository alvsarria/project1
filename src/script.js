console.log("Hello World! I am alive!");

let frameCounter = 0;

const gameAreaElement = document.querySelector("#game-area");
const playerElement = new gamePlayer(gameAreaElement);
const enemyElement = new gameEnemy(gameAreaElement);
enemyElement.createElement("enemy")


const fieldObject1 = new fieldObject("lake");
fieldObject1.createElement(328, 500);
const fieldObject2 = new fieldObject("rock");
fieldObject2.createElement(1200, 200);
const fieldObject3 = new fieldObject("tree");
fieldObject3.createElement(1400, 700);
const fieldObject4 = new fieldObject("tree");
fieldObject4.createElement(1400, 550);

arrayFieldObjects = [fieldObject1, fieldObject2, fieldObject3, fieldObject4]

function gameLoop() {
    // Add here all the movement that is going to be trigered on each frame
    playerElement.move();
    frameCounter++;
    if (enemyElement.idleState(playerElement)) {
        enemyElement.chase(playerElement)
    } else {
        enemyElement.idleMovement();
    }
    enemyElement.chase(playerElement);
    arrayFieldObjects.forEach(element => playerElement.playerCollission(element));
    arrayFieldObjects.forEach(element => enemyElement.enemyCollission(element));
    playerElement.playerCollission(enemyElement);
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.key === "w") {
        playerElement.direction[0] = true;
    } else if (keyEvent.key === "s") {
        playerElement.direction[1] = true;
    } else if (keyEvent.key === "a") {
        playerElement.direction[2] = true;
    } else if (keyEvent.key === "d") {
        playerElement.direction[3] = true;
    };
});


document.addEventListener("keyup", (keyEvent) => {
    if (keyEvent.key === "w") {
        playerElement.direction[0] = false;
    } else if (keyEvent.key === "s") {
        playerElement.direction[1] = false;
    } else if (keyEvent.key === "a") {
        playerElement.direction[2] = false;
    } else if (keyEvent.key === "d") {
        playerElement.direction[3] = false;
    };
});