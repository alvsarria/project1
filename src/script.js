let frameCounter = 0;

const gameAreaElement = document.querySelector("#game-area");

const mainLibraryObjects =
{
    playerElement: new gamePlayer(gameAreaElement),
    arrayEnemy: [],
    arrayFieldObjects: [],
    arrayFireBalls: [],
};

for (i = 0; i <= 1; i++) {
    mainLibraryObjects.arrayEnemy.push(new gameEnemy(gameAreaElement));
    mainLibraryObjects.arrayEnemy[i].createElement("enemy")
};

const fieldObject1 = new fieldObject("lake");
fieldObject1.createElement(328, 500);
const fieldObject2 = new fieldObject("rock");
fieldObject2.createElement(1200, 200);
const fieldObject3 = new fieldObject("tree");
fieldObject3.createElement(1400, 700);
const fieldObject4 = new fieldObject("tree");
fieldObject4.createElement(1400, 550);

mainLibraryObjects.arrayFieldObjects = [fieldObject1, fieldObject2, fieldObject3, fieldObject4]

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
        mainLibraryObjects.arrayFieldObjects.forEach(element2 => element1.fireBallCollission(element2, i, 0, mainLibraryObjects.playerElement))
        mainLibraryObjects.arrayEnemy.forEach((element2, j) => element1.fireBallCollission(element2, i, j, mainLibraryObjects.playerElement))
    })
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.key === "w") {
        mainLibraryObjects.playerElement.finalDirection = "up";
        mainLibraryObjects.playerElement.direction[0] = true;
    } else if (keyEvent.key === "s") {
        mainLibraryObjects.playerElement.finalDirection = "down";
        mainLibraryObjects.playerElement.direction[1] = true;
    } else if (keyEvent.key === "a") {
        mainLibraryObjects.playerElement.finalDirection = "left";
        mainLibraryObjects.playerElement.direction[2] = true;
    } else if (keyEvent.key === "d") {
        mainLibraryObjects.playerElement.finalDirection = "right";
        mainLibraryObjects.playerElement.direction[3] = true;
    };
});


document.addEventListener("keyup", (keyEvent) => {
    if (keyEvent.key === "w") {
        mainLibraryObjects.playerElement.direction[0] = false;
    } else if (keyEvent.key === "s") {
        mainLibraryObjects.playerElement.direction[1] = false;
    } else if (keyEvent.key === "a") {
        mainLibraryObjects.playerElement.direction[2] = false;
    } else if (keyEvent.key === "d") {
        mainLibraryObjects.playerElement.direction[3] = false;
    };
});

document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.repeat) return;
    if (keyEvent.key === "k") {
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