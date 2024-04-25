let frameCounter = 0;

const gameAreaElement = document.querySelector("#game-area");
const gameHeight = gameAreaElement.getBoundingClientRect().height;
const gameWidth = gameAreaElement.getBoundingClientRect().width;

const mainLibraryObjects =
{
    playerElement: new gamePlayer(gameAreaElement),
    arrayEnemy: [],
    arrayFieldObjects: [],
    arrayFireBalls: [],
};

let coordinateX = 0;
let coordinateY = 0;

const fieldObject1 = new fieldObject("lake");
coordinateX = gameWidth / 4 - fieldObject1.width / 2 - 120;
coordinateY = gameHeight / 4 - fieldObject1.height / 2 + 30;
fieldObject1.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject1);

const fieldObject2 = new fieldObject("lake");
coordinateX = gameWidth / 4 - fieldObject2.width / 2 - 80;
coordinateY = 3 * gameHeight / 4 - fieldObject2.height / 2 - 40;
fieldObject2.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject2);

const fieldObject3 = new fieldObject("lake");
coordinateX = 3 * gameWidth / 4 - fieldObject3.width / 2 + 120;
coordinateY = 3 * gameHeight / 4 - fieldObject3.height / 2 - 30;
fieldObject3.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject3);

const fieldObject4 = new fieldObject("lake");
coordinateX = 3 * gameWidth / 4 - fieldObject4.width / 2 + 120;
coordinateY = gameHeight / 4 - fieldObject4.height / 2 + 30;
fieldObject4.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject4);

const fieldObject5 = new fieldObject("rock");
coordinateX = gameWidth / 2 - fieldObject5.width / 2;
coordinateY = gameHeight / 4 - fieldObject5.height / 2;
fieldObject5.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject5);

const fieldObject6 = new fieldObject("rock");
coordinateX = gameWidth / 2 - fieldObject6.width / 2;
coordinateY = 3 * gameHeight / 4 - fieldObject6.height / 2;
fieldObject6.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject6);

const fieldObject7 = new fieldObject("tree");
coordinateX = gameWidth / 2 - fieldObject7.width / 2 + 250;
coordinateY = 3 * gameHeight / 4 - fieldObject7.height / 2 + 45;
fieldObject7.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject7);

const fieldObject8 = new fieldObject("tree");
coordinateX = gameWidth / 2 - fieldObject8.width / 2 - 220;
coordinateY = 3 * gameHeight / 4 - fieldObject8.height / 2 + 10;
fieldObject8.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject8);

const fieldObject9 = new fieldObject("tree");
coordinateX = gameWidth / 2 - fieldObject8.width / 2 - 220;
coordinateY = gameHeight / 4 - fieldObject4.height / 2 + 30;
fieldObject9.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject9);

const fieldObject10 = new fieldObject("tree");
coordinateX = gameWidth / 2 - fieldObject10.width / 2 + 250;
coordinateY = gameHeight / 4 - fieldObject10.height / 2 + 30;
fieldObject10.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject10);

setInterval(() => {
    const enemyObject = new gameEnemy(gameAreaElement)
    enemyObject.createElement("enemy");
    mainLibraryObjects.arrayEnemy.push(enemyObject);
    mainLibraryObjects.arrayEnemy.forEach(element1 => {
        mainLibraryObjects.arrayFieldObjects.forEach(element2 => element1.enemyCollission(element2));
    });
}, 5000)

function spearThrow() {
    const spear = document.createElement("div");
    spear.classList.add("spear")
    gameAreaElement.appendChild(spear);
    const spearHeight = spear.getBoundingClientRect().height;
    const spearWidth = spear.getBoundingClientRect().width;
    const direction = mainLibraryObjects.playerElement.currentDirection;
    let coordinateY = 0;
    let coordinateX = 0;
    if (direction === "up") {
        spear.style.transform = "rotate(-30deg)";
        coordinateY = mainLibraryObjects.playerElement.y - spearHeight + 30;
        coordinateX = mainLibraryObjects.playerElement.x + mainLibraryObjects.playerElement.width / 2 - spearWidth / 2
    } else if (direction === "down") {
        spear.style.transform = "rotate(150deg)";
        coordinateY = mainLibraryObjects.playerElement.y + mainLibraryObjects.playerElement.height - 30;
        coordinateX = mainLibraryObjects.playerElement.x + mainLibraryObjects.playerElement.width / 2 - spearWidth / 2
    } else if (direction === "left") {
        spear.style.transform = "rotate(250deg)";
        coordinateY = mainLibraryObjects.playerElement.y + mainLibraryObjects.playerElement.height / 2 - spearHeight / 2;
        coordinateX = mainLibraryObjects.playerElement.x - spearWidth + 30;
    } else if (direction === "right") {
        spear.style.transform = "rotate(45deg)";
        coordinateY = mainLibraryObjects.playerElement.y + mainLibraryObjects.playerElement.height / 2 - spearHeight / 2;
        coordinateX = mainLibraryObjects.playerElement.x + mainLibraryObjects.playerElement.width - 30;
    }
    spear.style.top = `${coordinateY}px`;
    spear.style.left = `${coordinateX}px`;
    setTimeout(() => {
        spear.remove()
    }, 80)
};

function gameLoop() {
    // Add here all the movement that is going to be trigered on each frame
    frameCounter++;
    mainLibraryObjects.playerElement.move();
    mainLibraryObjects.arrayFireBalls.forEach((element, i) => element.move(i));
    mainLibraryObjects.arrayEnemy.forEach(element => {
        if (element.idleState(mainLibraryObjects.playerElement)) {
            element.chase(mainLibraryObjects.playerElement);
        } else {
            element.idleMovement();
        };
    });
    mainLibraryObjects.arrayFieldObjects.forEach(element1 => {
        mainLibraryObjects.arrayEnemy.forEach(element2 => element2.enemyCollission(element1))
    });
    mainLibraryObjects.arrayEnemy.forEach(element => mainLibraryObjects.playerElement.playerCollission(element));
    mainLibraryObjects.arrayFieldObjects.forEach(element => mainLibraryObjects.playerElement.playerCollission(element));
    mainLibraryObjects.arrayEnemy.forEach(element => {
        element.enemyCollission(mainLibraryObjects.playerElement);
        element.attack1(mainLibraryObjects.playerElement);
    });
    mainLibraryObjects.arrayFireBalls.forEach((element1, i) => {
        mainLibraryObjects.arrayFieldObjects.forEach(element2 => {
            if (!element2.element.classList[0].includes("lake")) {
                element1.fireBallCollission(element2, i, 0, mainLibraryObjects.playerElement)
            };
        });
        mainLibraryObjects.arrayEnemy.forEach((element2, j) => element1.fireBallCollission(element2, i, j, mainLibraryObjects.playerElement))
    })
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.repeat) return;
    if (keyEvent.key === "w") {
        mainLibraryObjects.playerElement.finalDirection = "up";
        mainLibraryObjects.playerElement.currentDirection = "up";
        mainLibraryObjects.playerElement.element.querySelector(".icon").classList.toggle("characterMoveUp")
        mainLibraryObjects.playerElement.direction[0] = true;
    } else if (keyEvent.key === "s") {
        mainLibraryObjects.playerElement.finalDirection = "down";
        mainLibraryObjects.playerElement.currentDirection = "down";
        mainLibraryObjects.playerElement.element.querySelector(".icon").classList.toggle("characterMoveDown")
        mainLibraryObjects.playerElement.direction[1] = true;
    } else if (keyEvent.key === "a") {
        mainLibraryObjects.playerElement.finalDirection = "left";
        mainLibraryObjects.playerElement.currentDirection = "left";
        mainLibraryObjects.playerElement.element.querySelector(".icon").classList.toggle("characterMoveLeft")
        mainLibraryObjects.playerElement.direction[2] = true;
    } else if (keyEvent.key === "d") {
        mainLibraryObjects.playerElement.finalDirection = "right";
        mainLibraryObjects.playerElement.currentDirection = "right";
        mainLibraryObjects.playerElement.element.querySelector(".icon").classList.toggle("characterMoveRight")
        mainLibraryObjects.playerElement.direction[3] = true;
    };
});


document.addEventListener("keyup", (keyEvent) => {
    if (keyEvent.repeat) return;
    if (keyEvent.key === "w") {
        mainLibraryObjects.playerElement.element.querySelector(".icon").classList.toggle("characterMoveUp")
        mainLibraryObjects.playerElement.direction[0] = false;
    } else if (keyEvent.key === "s") {
        mainLibraryObjects.playerElement.element.querySelector(".icon").classList.toggle("characterMoveDown")
        mainLibraryObjects.playerElement.direction[1] = false;
    } else if (keyEvent.key === "a") {
        mainLibraryObjects.playerElement.element.querySelector(".icon").classList.toggle("characterMoveLeft")
        mainLibraryObjects.playerElement.direction[2] = false;
    } else if (keyEvent.key === "d") {
        mainLibraryObjects.playerElement.element.querySelector(".icon").classList.toggle("characterMoveRight")
        mainLibraryObjects.playerElement.direction[3] = false;
    };
});

document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.repeat) return;
    if (keyEvent.key === "k") {
        spearThrow();
        mainLibraryObjects.arrayEnemy.forEach((element, i) => {
            mainLibraryObjects.playerElement.attack1(element);
            if (element.life <= 0) {
                mainLibraryObjects.arrayEnemy.splice(i, 1);
            };
        });
    };
});

document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.repeat) return;
    if (keyEvent.key === "l") {
        spellThrown = new fireBall;
        spellThrown.createElement(mainLibraryObjects.playerElement);
    };
});

setInterval(() => {
    if (mainLibraryObjects.playerElement.mana < 100) {
        mainLibraryObjects.playerElement.mana += 10;
        if (mainLibraryObjects.playerElement.mana > 100) {
            mainLibraryObjects.playerElement.mana = 100;
        };
    };
    this.document.querySelector(".mana-bar").style.width = `${mainLibraryObjects.playerElement.mana}%`
}, 1000)
// document.addEventListener("keyup", (keyEvent) => {
//     if (keyEvent.key === "f") {
//         mainLibraryObjects.playerElement.fireSpell = false;
//     };
// });