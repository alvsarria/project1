let frameCounter = 0;

const gameAreaElement = document.querySelector("#game-area");
const gameHeight = gameAreaElement.getBoundingClientRect().height;
const gameWidth = gameAreaElement.getBoundingClientRect().width;

const audioSlash = document.querySelector("#audioSlash");
const audioFireball = document.querySelector("#audioFireball");
const audioKill = document.querySelector("#audioKill");
const audioDead = document.querySelector("#audioDead");
const audioEnemySlash = document.querySelector("#audioEnemySlash");
const audioGame = document.querySelector("#audioGame");
const audioGameOver = document.querySelector("#audioGameOver");
audioGame.loop = true;

document.addEventListener("keydown", (keyEvent) => {
    audioGame.play();
});
const mainLibraryObjects =
{
    playerElement: new gamePlayer(gameAreaElement),
    arrayEnemy: [],
    arrayFieldObjects: [],
    arrayFireBalls: [],
};

let coordinateX = 0;
let coordinateY = 0;

const fieldObject1 = new fieldObject("lake1");
coordinateX = gameWidth / 4 - fieldObject1.width / 2 - 120;
coordinateY = gameHeight / 4 - fieldObject1.height / 2 + 30;
fieldObject1.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject1);

const fieldObject2 = new fieldObject("lake");
coordinateX = gameWidth / 4 - fieldObject2.width / 2 - 80;
coordinateY = 3 * gameHeight / 4 - fieldObject2.height / 2;
fieldObject2.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject2);

const fieldObject3 = new fieldObject("lake1");
coordinateX = 3 * gameWidth / 4 - fieldObject3.width / 2 + 120;
coordinateY = 3 * gameHeight / 4 - fieldObject3.height / 2 - 30;
fieldObject3.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject3);

const fieldObject4 = new fieldObject("lake");
coordinateX = 3 * gameWidth / 4 - fieldObject4.width / 2 + 120;
coordinateY = gameHeight / 4 - fieldObject4.height / 2 + 100;
fieldObject4.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject4);

const fieldObject5 = new fieldObject("rock");
coordinateX = gameWidth / 2 - fieldObject5.width / 2 - 180;
coordinateY = gameHeight / 4 - fieldObject5.height / 2 - 40;
fieldObject5.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject5);

const fieldObject6 = new fieldObject("rock");
coordinateX = gameWidth / 2 - fieldObject6.width / 2 + 200;
coordinateY = 3 * gameHeight / 4 - fieldObject6.height / 2 - 40;
fieldObject6.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject6);

const fieldObject7 = new fieldObject("rock1");
coordinateX = gameWidth / 2 - fieldObject7.width / 2 + 500;
coordinateY = 3 * gameHeight / 4 - fieldObject7.height / 2 - 500;
fieldObject7.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject7);

const fieldObject8 = new fieldObject("rock1");
coordinateX = gameWidth / 2 - fieldObject8.width / 2 - 600;
coordinateY = 3 * gameHeight / 4 - fieldObject8.height / 2 + 180;
fieldObject8.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject8);

const fieldObject9 = new fieldObject("rock1");
coordinateX = gameWidth / 2 - fieldObject9.width / 2 - 200;
coordinateY = 3 * gameHeight / 4 - fieldObject9.height / 2 - 100;
fieldObject9.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject9);

const fieldObject10 = new fieldObject("rock1");
coordinateX = gameWidth / 2 + 200;
coordinateY = gameHeight / 2 - 200;
fieldObject10.move(coordinateY, coordinateX);
mainLibraryObjects.arrayFieldObjects.push(fieldObject10);

let enemySpecial = false;

setInterval(() => {
    if (!mainLibraryObjects.playerElement.gameOver) {
        if (!enemySpecial || mainLibraryObjects.arrayEnemy.length < 5) {
            const enemyObject = new gameEnemy(gameAreaElement)
            enemyObject.createElement("enemy");
            mainLibraryObjects.arrayEnemy.push(enemyObject);
            mainLibraryObjects.arrayEnemy.forEach(element1 => {
                mainLibraryObjects.arrayFieldObjects.forEach(element2 => element1.enemyCollission(element2));
            });
            if (mainLibraryObjects.arrayEnemy.length >= 4 && !enemySpecial) {
                enemySpecial = true;
                const enemyObject1 = new gameEnemySpecial(gameAreaElement)
                enemyObject1.createElement("enemySpecial");
                mainLibraryObjects.arrayEnemy.push(enemyObject1);
            };
        };
    };
}, 2000)

setInterval(() => {
    if (!mainLibraryObjects.playerElement.gameOver) {
        enemySpecial = true;
        const enemyObject1 = new gameEnemySpecial(gameAreaElement)
        enemyObject1.createElement("enemySpecial");
        mainLibraryObjects.arrayEnemy.push(enemyObject1);
    };
}, 15000)

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

let timer_format = "";
let counter = 0;

const timer = setInterval(() => {
    counter++;
    if (mainLibraryObjects.playerElement.gameOver) {
        clearInterval(timer);
    };
}, 1000);

let enemyCounter = 0;

function gameLoop() {
    if (!mainLibraryObjects.playerElement.gameOver) {
        frameCounter++;
        mainLibraryObjects.playerElement.move();
        mainLibraryObjects.arrayFireBalls.forEach((element, i) => element.move(i));
        mainLibraryObjects.arrayEnemy.forEach(element => {
            // if (element.idleState(mainLibraryObjects.playerElement)) {
            element.chase(mainLibraryObjects.playerElement);
            // } else {
            //     element.idleMovement();
            // };
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
    } else {
        const banner = document.createElement("div");
        banner.classList.add("banner");
        gameAreaElement.appendChild(banner);
        const bannerWrapper = document.createElement("div");
        bannerWrapper.classList.add("bannerWrapper");
        banner.appendChild(bannerWrapper);
        const info1 = document.createElement("div");
        info1.classList.add("bannerInfo");
        info1.innerHTML = `Eemies defeated: ${enemyCounter}`
        bannerWrapper.appendChild(info1);
        const info2 = document.createElement("div");
        info2.classList.add("bannerInfo");
        info2.innerHTML = `Total score: ${mainLibraryObjects.playerElement.score}`
        bannerWrapper.appendChild(info2);
        const info3 = document.createElement("div");
        info3.classList.add("bannerInfo");
        info3.innerHTML = `Time survived: ${counter}`
        bannerWrapper.appendChild(info3);
        const bannerWrapper2 = document.createElement("div");
        bannerWrapper2.classList.add("bannerWrapper");
        banner.appendChild(bannerWrapper2);
        const info4 = document.createElement("a");
        info4.href = "../html/game.html"
        info4.classList.add("bannerInfo2");
        info4.classList.add("popping");
        info4.innerHTML = "Restart"
        info4.style.textDecoration = 'none';
        info4.style.color = 'inherit'
        bannerWrapper2.appendChild(info4);
        const info5 = document.createElement("a");
        info5.href = "../index.html"
        info5.style.textDecoration = 'none';
        info5.style.color = 'inherit'
        info5.classList.add("bannerInfo2");
        info5.classList.add("popping");
        info5.innerHTML = "Exit"
        bannerWrapper2.appendChild(info5);
    };
};

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
    if (!mainLibraryObjects.playerElement.gameOver) {
        if (keyEvent.repeat) return;
        if (keyEvent.key === "k") {
            if (audioSlash.paused) {
                audioSlash.play();
            } else {
                audioSlash.currentTime = 0;
            };
            spearThrow();
            mainLibraryObjects.arrayEnemy.forEach((element, i) => {
                mainLibraryObjects.playerElement.attack1(element);
                if (element.life <= 0) {
                    if (audioKill.paused) {
                        audioKill.play();
                    } else {
                        audioKill.currentTime = 0;
                    };
                    enemyCounter++;
                    mainLibraryObjects.arrayEnemy.splice(i, 1);
                };
            });
        };
    };
});

document.addEventListener("keydown", (keyEvent) => {
    if (!mainLibraryObjects.playerElement.gameOver) {
        if (keyEvent.repeat) return;
        if (keyEvent.key === "l") {
            if (mainLibraryObjects.playerElement.mana >= 20) {
                if (audioFireball.paused) {
                    audioFireball.play();
                } else {
                    audioFireball.currentTime = 0;
                };
            };
            spellThrown = new fireBall;
            spellThrown.createElement(mainLibraryObjects.playerElement);
        };
    };
});

document.addEventListener("keydown", (keyEvent) => {
    if (!mainLibraryObjects.playerElement.gameOver) {
        if (keyEvent.repeat) return;
        if (keyEvent.key === "l") {
            if (mainLibraryObjects.playerElement.mana >= 20) {
                if (audioFireball.paused) {
                    audioFireball.play();
                } else {
                    audioFireball.currentTime = 0;
                };
            };
            spellThrown = new fireBall;
            spellThrown.createElement(mainLibraryObjects.playerElement);
        };
    };
});

window.addEventListener('resize', function () {
    "use strict";
    window.location.reload();
});

setInterval(() => {
    if (!mainLibraryObjects.playerElement.gameOver) {
        if (mainLibraryObjects.playerElement.mana < 100) {
            mainLibraryObjects.playerElement.mana += 10;
            if (mainLibraryObjects.playerElement.mana > 100) {
                mainLibraryObjects.playerElement.mana = 100;
            };
        };
        this.document.querySelector(".mana-bar").style.width = `${mainLibraryObjects.playerElement.mana}%`
    };
}, 1000);