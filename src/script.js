console.log("Hello World! I am alive!");

let frameCounter = 0;

const gameAreaElement = document.querySelector("#game-area");
const playerElement = new gamePlayer(gameAreaElement);
const enemyElement1 = new gameEnemy(gameAreaElement);
enemyElement1.createElement("enemy")
const enemyElement2 = new gameEnemy(gameAreaElement);
enemyElement2.createElement("enemy")

arrayEnemy = [enemyElement1, enemyElement2]

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
    arrayEnemy.forEach(element => {
        if (element.idleState(playerElement)){
            element.chase(playerElement);
        } else {
            element.idleMovement();
        };
    });
    arrayFieldObjects.forEach(element1 =>{
        arrayEnemy.forEach(element2 => element2.enemyCollission(element1))
    });
    arrayEnemy.forEach(element => playerElement.playerCollission(element));
    arrayFieldObjects.forEach(element => playerElement.playerCollission(element));
    arrayEnemy.forEach(element => element.enemyCollission(playerElement));
    enemyElement1.enemyCollission(enemyElement2);
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