console.log("Hello World! I am alive!");

let frameCounter = 0;

const gameAreaElement = document.querySelector("#game-area");
const playerElement = new gamePlayer(gameAreaElement);
const enemyElement = new gameEnemy(gameAreaElement);

let idleTopCornerRight = enemyElement.x + enemyElement.idleRadius;
let firstFlag = false;
let idleBottomCornerRight = enemyElement.y + enemyElement.idleRadius;
let secondFlag = false;
let idleTopCornerLeft = enemyElement.x - enemyElement.idleRadius;
let thirdFlag = false;
let idleBottomCornerLeft = enemyElement.y - enemyElement.idleRadius;

// Checking if player or enemy collide with each other
function collissionCheck() {
    if (
        (
            // Checks right upper corner of player agains enemy width position
            (
                (playerElement.x + playerElement.width) <= (enemyElement.x + enemyElement.width)
                && (playerElement.x + playerElement.width) >= enemyElement.x
            )
            //  Checks left upper corner of player element against enemy width position
            || (
                playerElement.x >= enemyElement.x
                && (playerElement.x <= enemyElement.x + enemyElement.width)
            )
        )
        && (
            // Checks upper left corner of player agains enemy height position
            (
                playerElement.y >= enemyElement.y
                && (playerElement.y <= enemyElement.y + enemyElement.height)
            )
            // Checks lower left corner of player agains enemy height position
            || (
                (playerElement.y + playerElement.height) <= (enemyElement.y + enemyElement.height)
                && (playerElement.y + playerElement.height) >= enemyElement.y
            )
        )
    ) {
        console.log("CRASH");
    }
}

function chase() {
    // randomly moves the enemy on the X axis towards the player direction
    if (Math.floor(Math.random() * 2) === 0 && enemyElement.x !== playerElement.x) {
        if (enemyElement.x + enemyElement.width >= playerElement.x + playerElement.width) {
            enemyElement.x -= enemyElement.velocity;
            if (enemyElement.x <= playerElement.x) {
                enemyElement.x = playerElement.x;
            }
            enemyElement.element.style.left = `${enemyElement.x}px`;
        } else {
            enemyElement.x += enemyElement.velocity;
            enemyElement.element.style.left = `${enemyElement.x}px`;
        }
        // randomly moves the enemy on the Y axis towards the player direction
    } else if (Math.floor(Math.random() * 2) === 1 && enemyElement.y !== playerElement.y) {
        if (enemyElement.y + enemyElement.height >= playerElement.y + playerElement.height) {
            enemyElement.y -= enemyElement.velocity;
            if (enemyElement.y <= playerElement.y) {
                enemyElement.y = playerElement.y;
            }
            enemyElement.element.style.top = `${enemyElement.y}px`;
        } else {
            enemyElement.y += enemyElement.velocity;
            enemyElement.element.style.top = `${enemyElement.y}px`;
        }
    };
};

function idleMovement() {
    if (!firstFlag) {
        enemyElement.x += enemyElement.idleVelocity;
        if (enemyElement.x >= idleTopCornerRight) {
            enemyElement.x = idleTopCornerRight;
            firstFlag = true;
        };
        enemyElement.element.style.left = `${enemyElement.x}px`;
    }
    if (!secondFlag & firstFlag) {
        enemyElement.y += enemyElement.idleVelocity;
        if (enemyElement.y >= idleBottomCornerRight) {
            enemyElement.y = idleBottomCornerRight;
            secondFlag = true;
        };
        enemyElement.element.style.top = `${enemyElement.y}px`;
    };
    if (!thirdFlag & secondFlag & firstFlag) {
        enemyElement.x -= enemyElement.idleVelocity;
        if (enemyElement.x <= idleTopCornerLeft) {
            enemyElement.x = idleTopCornerLeft;
            thirdFlag = true;
        };
        enemyElement.element.style.left = `${enemyElement.x}px`;
    };
    if (thirdFlag & secondFlag & firstFlag) {
        enemyElement.y -= enemyElement.idleVelocity;
        if (enemyElement.y <= idleBottomCornerLeft) {
            enemyElement.y = idleBottomCornerLeft;
            firstFlag = false
            secondFlag = false
            thirdFlag = false
        };
        enemyElement.element.style.top = `${enemyElement.y}px`;
    };
};

let distance = 0;

function gameLoop() {
    // Add here all the movement that is going to be trigered on each frame
    frameCounter++;
    // enemiesArray.forEach((enemy) => {
    //   enemy.move();
    // });
    distance = (((playerElement.x + playerElement.width / 2) - (enemyElement.x + enemyElement.width / 2)) ** 2 +
        ((playerElement.y + playerElement.height / 2) - (enemyElement.y + enemyElement.height / 2)) ** 2) ** 1 / 2;
    console.log(distance);
    if (distance <= enemyElement.ChaseRadius){
        chase();
    } else{
        idleMovement();
    }
    collissionCheck();
    playerElement.move();
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