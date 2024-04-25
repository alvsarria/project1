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
coordinateX = gameWidth / 4 - fieldObject2.width / 2 - 120;
coordinateY = 3 * gameHeight / 4 - fieldObject2.height / 2 - 30;
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


// const fieldObject2 = new fieldObject("rock");
// fieldObject2.createElement(1200, 200);
// const fieldObject3 = new fieldObject("tree");
// fieldObject3.createElement(1400, 700);
// const fieldObject4 = new fieldObject("tree");
// fieldObject4.createElement(1400, 550);

// mainLibraryObjects.arrayFieldObjects = [fieldObject1, fieldObject2, fieldObject3, fieldObject4]
// mainLibraryObjects.arrayFieldObjects = [fieldObject1]

// setInterval(() =>{
//     const enemyObject = new gameEnemy(gameAreaElement)
//     enemyObject.createElement("enemy");
//     mainLibraryObjects.arrayEnemy.push(enemyObject);
//     mainLibraryObjects.arrayEnemy.forEach(element1 => {
//         mainLibraryObjects.arrayFieldObjects.forEach(element2 => element1.enemyCollission(element2));
//     });
// },5000)

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
            if(!element2.element.classList[0].includes("lake")){
                element1.fireBallCollission(element2, i, 0, mainLibraryObjects.playerElement)
            };
        });
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