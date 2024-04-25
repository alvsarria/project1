// Define player object
class gamePlayer {
    constructor(gameAreaElement) {
        // Define Element
        this.gameAreaElement = document.querySelector("#game-area");
        this.element = document.querySelector("#player");
        // Define Size
        this.height = this.element.getBoundingClientRect().height;
        this.width = this.element.getBoundingClientRect().width;
        // Define Boundaries
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Define Position
        this.y = this.gameAreaHeight / 2 - this.height / 2;
        this.x = this.gameAreaWidth / 2 - this.width / 2;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        // Movement Properties
        this.direction = [false, false, false, false];
        this.finalDirection = null;
        this.currentDirection = null;
        this.velocity = 5;
        this.distance = null;
        this.movement = true;
        // Combat Properties
        this.life = 100;
        this.mana = 100;
        this.attack = 10;
        this.fireSpell = false;
        // Game state
        this.gameOver = false;
        this.score = 0;
    };

    move() {
        // Moving up + game boundaries
        if (this.direction[0]) {
            this.element.querySelector(".icon").style.backgroundImage = "url(../images/character_up.png)"
            if (this.y <= 0) {
                this.y = 0;
                this.element.style.top = `${this.y}px`;
            } else {
                this.y -= this.velocity;
                this.element.style.top = `${this.y}px`;
            }
            // Moving down + game boundaries
        } if (this.direction[1]) {
            this.element.querySelector(".icon").style.backgroundImage = "url(../images/character_down.png)"
            if (this.y >= (this.gameAreaHeight - this.height)) {
                this.y = this.gameAreaHeight - this.height;
                this.element.style.top = `${this.y}px`;
            } else {
                this.y += this.velocity;
                this.element.style.top = `${this.y}px`;
            }
            // Moving left + game boundaries
        } else {
        } if (this.direction[2]) {
            this.element.querySelector(".icon").style.backgroundImage = "url(../images/character_left.png)"
            if (this.x <= 0) {
                this.x = 0;
                this.element.style.left = `${this.x}px`;
            } else {
                this.x -= this.velocity;
                this.element.style.left = `${this.x}px`;
            }
            // Moving right + game boundaries
        } if (this.direction[3]) {
            this.element.querySelector(".icon").style.backgroundImage = "url(../images/character_right.png)"
            if (this.x >= (this.gameAreaWidth - this.width)) {
                this.x = this.gameAreaWidth - this.width;
                this.element.style.left = `${this.x}px`;
            } else {
                this.x += this.velocity;
                this.element.style.left = `${this.x}px`;
            };
        };
    };

    playerCollission(collisionObject) {
        if (
            (
                // Checks right upper corner of player agains enemy width position
                (
                    this.x >= collisionObject.x
                    && this.x <= collisionObject.x + collisionObject.width
                )
                //  Checks left upper corner of player element against enemy width position
                || (
                    this.x + this.width <= collisionObject.width + collisionObject.x
                    && this.x + this.width >= collisionObject.x
                )
            )
            && (
                // Checks upper left corner of player agains enemy height position
                (
                    this.y >= collisionObject.y
                    && this.y <= collisionObject.y + collisionObject.height
                )
                // Checks lower left corner of player agains enemy height position
                || (
                    this.y + this.height <= collisionObject.y + collisionObject.height
                    && this.y + this.height >= collisionObject.y
                )
            )
        ) {
            let diffX = (this.x + this.width / 2) - (collisionObject.x + collisionObject.width / 2);
            let diffY = (collisionObject.y + collisionObject.height / 2) - (this.y + this.height / 2);
            if (diffX < 0) {
                if (diffY < 0) {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y + collisionObject.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM TOP");
                    } else {
                        this.x = collisionObject.x - this.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM RIGHT");
                    };
                    return true;
                } else {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y - this.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM BOTTOM");
                    } else {
                        this.x = collisionObject.x - this.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM RIGHT");
                    };
                    return true;
                };
            } else {
                if (diffY < 0) {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y + collisionObject.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM TOP");
                    } else {
                        this.x = collisionObject.x + collisionObject.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM LEFT");
                    };
                    return true;
                } else {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y - this.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM BOTTOM");
                    } else {
                        this.x = collisionObject.x + collisionObject.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM LEFT");
                    };
                    return true;
                };
            };
        } else {
            return false;
        };
    };

    attack1(objectGame) {
        if (this.playerCollission(objectGame)) {
            objectGame.life -= this.attack;
            if (objectGame.life <= 0) {
                if (objectGame.element.classList[0] === 'enemySpecial') {
                    this.score += 100;
                } else {
                    this.score += 10;
                };
                objectGame.element.remove();
                this.life += 30;
                this.mana += 40;
                console.log(`Score is ${this.score}`)
                if (this.life > 100) {
                    this.life = 100;
                };
                if (this.mana > 100) {
                    this.mana = 100;
                };
                this.element.querySelector(".mana-bar").style.width = `${this.mana}%`
                this.element.querySelector(".health-bar").style.width = `${this.life}%`
            };
            if (objectGame.element.classList[0] === 'enemy') {
                objectGame.element.querySelector(".health-barEnemy").style.width = `${objectGame.life}%`
            } else {
                objectGame.element.querySelector(".health-barEnemySpecial").style.width = `${objectGame.life / 5}%`
            }
        };
    };
};

class gameEnemy {
    constructor(gameAreaElement) {
        // Define Boundaries
        this.gameAreaElement = document.querySelector("#game-area");
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Define Position
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        // Define Boundaries
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Movement Properties
        this.direction = [false, false, false, false];
        this.velocity = 5;
        this.ChaseRadius = 50000 * 2;
        // Idle Movement Properties
        this.idleVelocity = this.velocity / 2;
        this.idleRadius = 150;
        this.idleTopCornerRight = null;
        this.firstFlag = false;
        this.idleBottomCornerRight = null;
        this.secondFlag = false;
        this.idleTopCornerLeft = null;
        this.thirdFlag = false;
        this.idleBottomCornerLeft = null;
        // Combat Properties
        this.life = 100;
        this.attack = 5;
    };

    createElement(classObject) {
        this.element = document.createElement("div");
        this.element.classList.add(classObject);
        const iconEnemy = document.createElement("div");
        const healthBar = document.createElement("div");
        iconEnemy.classList.add("iconEnemy");
        healthBar.classList.add("health-barEnemy");
        this.element.appendChild(iconEnemy);
        this.element.appendChild(healthBar);
        // remember the bug we had in class? We have to append the element to the game area before we can get its width and height!
        this.gameAreaElement.appendChild(this.element);
        this.height = this.element.getBoundingClientRect().height;
        this.width = this.element.getBoundingClientRect().width;
        const yCoordinate = Math.floor(Math.random() * (this.gameAreaHeight - this.height))
        const xCoordinate = Math.floor(Math.random() * (this.gameAreaWidth - this.width))
        this.y = yCoordinate;
        this.x = xCoordinate;
        this.element.style.top = `${yCoordinate}px`;
        this.element.style.left = `${xCoordinate}px`;
        this.idleTopCornerRight = this.x + this.idleRadius;
        this.idleBottomCornerRight = this.y + this.idleRadius;
        this.idleTopCornerLeft = this.x - this.idleRadius;
        this.idleBottomCornerLeft = this.y - this.idleRadius;
    };

    enemyCollission(collisionObject) {
        if (
            (
                // Checks right upper corner of player agains enemy width position
                (
                    this.x >= collisionObject.x
                    && this.x <= collisionObject.x + collisionObject.width
                )
                //  Checks left upper corner of player element against enemy width position
                || (
                    this.x + this.width <= collisionObject.width + collisionObject.x
                    && this.x + this.width >= collisionObject.x
                )
            )
            && (
                // Checks upper left corner of player agains enemy height position
                (
                    this.y >= collisionObject.y
                    && this.y <= collisionObject.y + collisionObject.height
                )
                // Checks lower left corner of player agains enemy height position
                || (
                    this.y + this.height <= collisionObject.y + collisionObject.height
                    && this.y + this.height >= collisionObject.y
                )
            )
        ) {
            let diffX = (this.x + this.width / 2) - (collisionObject.x + collisionObject.width / 2);
            let diffY = (collisionObject.y + collisionObject.height / 2) - (this.y + this.height / 2);
            if (diffX < 0) {
                if (diffY < 0) {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y + collisionObject.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM BOTTOM");
                    } else {
                        this.x = collisionObject.x - this.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM RIGHT");
                    };
                    return true;
                } else {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y - this.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM TOP");
                    } else {
                        this.x = collisionObject.x - this.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM RIGHT");
                    };
                    return true;
                };
            } else {
                if (diffY < 0) {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y + collisionObject.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM BOTTOM");
                    } else {
                        this.x = collisionObject.x + collisionObject.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM LEFT");
                    };
                    return true;
                } else {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y - this.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM TOP");
                    } else {
                        this.x = collisionObject.x + collisionObject.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM LEFT");
                    };
                    return true;
                };
            };
        } else {
            return false;
        };
    };

    idleState(playerObject) {
        this.distance = (((playerObject.x + playerObject.width / 2) - (this.x + this.width / 2)) ** 2 +
            ((playerObject.y + playerObject.height / 2) - (this.y + this.height / 2)) ** 2) ** 1 / 2;
        if (this.distance <= this.ChaseRadius) {
            return true;
        } else {
            return false;
        };
    };

    idleMovement() {
        // Starts idle movement towards right 
        if (!this.firstFlag) {
            this.x += this.idleVelocity;
            this.element.querySelector(".iconEnemy").style.backgroundImage = "url(../images/skelly_right.png)"
            if (this.x + this.width >= this.gameAreaWidth) {
                this.firstFlag = true;
                this.x = this.gameAreaWidth - this.width;
            } else if (this.x >= this.idleTopCornerRight) {
                this.firstFlag = true;
            };
            this.element.style.left = `${this.x}px`;
        };
        // Ctarts idle movement towards down
        if (!this.secondFlag & this.firstFlag) {
            this.element.querySelector(".iconEnemy").style.backgroundImage = "url(../images/skelly_down.png)"
            this.y += this.idleVelocity;
            if (this.y + this.height >= this.gameAreaHeight) {
                this.secondFlag = true;
                this.y = this.gameAreaHeight - this.height;
            } else if (this.y >= this.idleBottomCornerRight) {
                this.secondFlag = true;
            };
            this.element.style.top = `${this.y}px`;
        };
        // Continues idle movement towards right
        if (!this.thirdFlag & this.secondFlag & this.firstFlag) {
            this.element.querySelector(".iconEnemy").style.backgroundImage = "url(../images/skelly_left.png)"
            this.x -= this.idleVelocity;
            if (this.x <= 0) {
                this.thirdFlag = true;
                this.x = 0
            } else if (this.x <= this.idleTopCornerLeft) {
                this.thirdFlag = true;
            };
            this.element.style.left = `${this.x}px`;
        };
        // Continues idle movement towards up and resets movement
        if (this.thirdFlag & this.secondFlag & this.firstFlag) {
            this.element.querySelector(".iconEnemy").style.backgroundImage = "url(../images/skelly_up.png)"
            this.y -= this.idleVelocity;
            if (this.y <= 0) {
                this.firstFlag = false;
                this.secondFlag = false;
                this.thirdFlag = false;
                this.y = 0;
            } else if (this.y <= this.idleBottomCornerLeft) {
                this.firstFlag = false;
                this.secondFlag = false;
                this.thirdFlag = false;
            };
            this.element.style.top = `${this.y}px`;
        };
    };

    chase(playerObject) {
        // randomly moves the enemy on the X axis towards the player direction
        if (Math.floor(Math.random() * 2) === 0 && this.x !== playerObject.x) {
            if (this.x > playerObject.width + playerObject.x) {
                this.element.querySelector(".iconEnemy").style.backgroundImage = "url(../images/skelly_left.png)"
                this.x -= this.velocity;
                if (this.x < playerObject.width + playerObject.x) {
                    this.x = playerObject.width + playerObject.x;
                };
                this.element.style.left = `${this.x}px`;
            } else if (this.x + this.width < playerObject.x) {
                this.element.querySelector(".iconEnemy").style.backgroundImage = "url(../images/skelly_right.png)"
                this.x += this.velocity;
                if (this.x + this.width > playerObject.x) {
                    this.x = playerObject.x - this.width;
                };
                this.element.style.left = `${this.x}px`;
            };
            // randomly moves the enemy on the Y axis towards the player direction
        } else if (Math.floor(Math.random() * 2) === 1 && this.y !== playerObject.y) {
            if (this.y > playerObject.height + playerObject.y) {
                this.element.querySelector(".iconEnemy").style.backgroundImage = "url(../images/skelly_up.png)"
                this.y -= this.velocity;
                if (this.y < playerObject.height + playerObject.y) {
                    this.y = playerObject.height + playerObject.y;
                };
                this.element.style.top = `${this.y}px`;
            } else if (this.y + this.height < playerObject.y) {
                this.element.querySelector(".iconEnemy").style.backgroundImage = "url(../images/skelly_down.png)"
                this.y += this.velocity;
                if (this.y + this.height > playerObject.y) {
                    this.y = playerObject.y - this.height;
                };
                this.element.style.top = `${this.y}px`;
            };
        };
    };

    attack1(objectGame) {
        if (!objectGame.gameOver) {
            if (this.enemyCollission(objectGame)) {
                if (Math.floor(Math.random() * 10) === 0) {
                    if (audioEnemySlash.paused) {
                        audioEnemySlash.play();
                    } else {
                        audioEnemySlash.currentTime = 0;
                    };
                    objectGame.life -= this.attack;
                    if (objectGame.life <= 0) {
                        if (audioDead.paused) {
                            audioDead.play();
                        } else {
                            audioDead.currentTime = 0;
                        };
                        audioGame.pause();
                        audioGame.currentTime = 0;
                        if (audioDead.paused) {
                            audioGameOver.play();
                        } else {
                            audioGameOver.currentTime = 0;
                        };
                        objectGame.element.remove();
                        objectGame.gameOver = true;
                    };
                    objectGame.element.querySelector(".health-bar").style.width = `${objectGame.life}%`
                };
            };
        };
    };
};

class gameEnemySpecial {
    constructor(gameAreaElement) {
        // Define Boundaries
        this.gameAreaElement = document.querySelector("#game-area");
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Define Position
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        // Define Boundaries
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Movement Properties
        this.direction = [false, false, false, false];
        this.velocity = 5;
        this.ChaseRadius = 50000 * 2;
        // Idle Movement Properties
        this.idleVelocity = this.velocity / 2;
        this.idleRadius = 150;
        this.idleTopCornerRight = null;
        this.firstFlag = false;
        this.idleBottomCornerRight = null;
        this.secondFlag = false;
        this.idleTopCornerLeft = null;
        this.thirdFlag = false;
        this.idleBottomCornerLeft = null;
        // Combat Properties
        this.life = 300;
        this.attack = 20;
    };

    createElement(classObject) {
        this.element = document.createElement("div");
        this.element.classList.add(classObject);
        const iconEnemy = document.createElement("div");
        const healthBar = document.createElement("div");
        iconEnemy.classList.add("iconEnemySpecial");
        healthBar.classList.add("health-barEnemySpecial");
        this.element.appendChild(iconEnemy);
        this.element.appendChild(healthBar);
        // remember the bug we had in class? We have to append the element to the game area before we can get its width and height!
        this.gameAreaElement.appendChild(this.element);
        this.height = this.element.getBoundingClientRect().height;
        this.width = this.element.getBoundingClientRect().width;
        const yCoordinate = Math.floor(Math.random() * (this.gameAreaHeight - this.height))
        const xCoordinate = Math.floor(Math.random() * (this.gameAreaWidth - this.width))
        this.y = yCoordinate;
        this.x = xCoordinate;
        this.element.style.top = `${yCoordinate}px`;
        this.element.style.left = `${xCoordinate}px`;
        this.idleTopCornerRight = this.x + this.idleRadius;
        this.idleBottomCornerRight = this.y + this.idleRadius;
        this.idleTopCornerLeft = this.x - this.idleRadius;
        this.idleBottomCornerLeft = this.y - this.idleRadius;
    };

    enemyCollission(collisionObject) {
        if (
            (
                // Checks right upper corner of player agains enemy width position
                (
                    this.x >= collisionObject.x
                    && this.x <= collisionObject.x + collisionObject.width
                )
                //  Checks left upper corner of player element against enemy width position
                || (
                    this.x + this.width <= collisionObject.width + collisionObject.x
                    && this.x + this.width >= collisionObject.x
                )
            )
            && (
                // Checks upper left corner of player agains enemy height position
                (
                    this.y >= collisionObject.y
                    && this.y <= collisionObject.y + collisionObject.height
                )
                // Checks lower left corner of player agains enemy height position
                || (
                    this.y + this.height <= collisionObject.y + collisionObject.height
                    && this.y + this.height >= collisionObject.y
                )
            )
        ) {
            let diffX = (this.x + this.width / 2) - (collisionObject.x + collisionObject.width / 2);
            let diffY = (collisionObject.y + collisionObject.height / 2) - (this.y + this.height / 2);
            if (diffX < 0) {
                if (diffY < 0) {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y + collisionObject.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM BOTTOM");
                    } else {
                        this.x = collisionObject.x - this.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM RIGHT");
                    };
                    return true;
                } else {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y - this.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM TOP");
                    } else {
                        this.x = collisionObject.x - this.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM RIGHT");
                    };
                    return true;
                };
            } else {
                if (diffY < 0) {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y + collisionObject.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM BOTTOM");
                    } else {
                        this.x = collisionObject.x + collisionObject.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM LEFT");
                    };
                    return true;
                } else {
                    if (Math.abs(diffY) > Math.abs(diffX)) {
                        this.y = collisionObject.y - this.height;
                        this.element.style.top = `${this.y}px`;
                        // console.log("CRASH FROM TOP");
                    } else {
                        this.x = collisionObject.x + collisionObject.width;
                        this.element.style.left = `${this.x}px`;
                        // console.log("CRASH FROM LEFT");
                    };
                    return true;
                };
            };
        } else {
            return false;
        };
    };

    idleState(playerObject) {
        this.distance = (((playerObject.x + playerObject.width / 2) - (this.x + this.width / 2)) ** 2 +
            ((playerObject.y + playerObject.height / 2) - (this.y + this.height / 2)) ** 2) ** 1 / 2;
        if (this.distance <= this.ChaseRadius) {
            return true;
        } else {
            return false;
        };
    };

    idleMovement() {
        // Starts idle movement towards right 
        if (!this.firstFlag) {
            this.x += this.idleVelocity;
            this.element.querySelector(".iconEnemySpecial").style.backgroundImage = "url(../images/skelly_right.png)"
            if (this.x + this.width >= this.gameAreaWidth) {
                this.firstFlag = true;
                this.x = this.gameAreaWidth - this.width;
            } else if (this.x >= this.idleTopCornerRight) {
                this.firstFlag = true;
            };
            this.element.style.left = `${this.x}px`;
        };
        // Ctarts idle movement towards down
        if (!this.secondFlag & this.firstFlag) {
            this.element.querySelector(".iconEnemySpecial").style.backgroundImage = "url(../images/skelly_down.png)"
            this.y += this.idleVelocity;
            if (this.y + this.height >= this.gameAreaHeight) {
                this.secondFlag = true;
                this.y = this.gameAreaHeight - this.height;
            } else if (this.y >= this.idleBottomCornerRight) {
                this.secondFlag = true;
            };
            this.element.style.top = `${this.y}px`;
        };
        // Continues idle movement towards right
        if (!this.thirdFlag & this.secondFlag & this.firstFlag) {
            this.element.querySelector(".iconEnemySpecial").style.backgroundImage = "url(../images/skelly_left.png)"
            this.x -= this.idleVelocity;
            if (this.x <= 0) {
                this.thirdFlag = true;
                this.x = 0
            } else if (this.x <= this.idleTopCornerLeft) {
                this.thirdFlag = true;
            };
            this.element.style.left = `${this.x}px`;
        };
        // Continues idle movement towards up and resets movement
        if (this.thirdFlag & this.secondFlag & this.firstFlag) {
            this.element.querySelector(".iconEnemySpecial").style.backgroundImage = "url(../images/skelly_up.png)"
            this.y -= this.idleVelocity;
            if (this.y <= 0) {
                this.firstFlag = false;
                this.secondFlag = false;
                this.thirdFlag = false;
                this.y = 0;
            } else if (this.y <= this.idleBottomCornerLeft) {
                this.firstFlag = false;
                this.secondFlag = false;
                this.thirdFlag = false;
            };
            this.element.style.top = `${this.y}px`;
        };
    };

    chase(playerObject) {
        // randomly moves the enemy on the X axis towards the player direction
        if (Math.floor(Math.random() * 2) === 0 && this.x !== playerObject.x) {
            if (this.x > playerObject.width + playerObject.x) {
                this.element.querySelector(".iconEnemySpecial").style.backgroundImage = "url(../images/skelly_left.png)"
                this.x -= this.velocity;
                if (this.x < playerObject.width + playerObject.x) {
                    this.x = playerObject.width + playerObject.x;
                };
                this.element.style.left = `${this.x}px`;
            } else if (this.x + this.width < playerObject.x) {
                this.element.querySelector(".iconEnemySpecial").style.backgroundImage = "url(../images/skelly_right.png)"
                this.x += this.velocity;
                if (this.x + this.width > playerObject.x) {
                    this.x = playerObject.x - this.width;
                };
                this.element.style.left = `${this.x}px`;
            };
            // randomly moves the enemy on the Y axis towards the player direction
        } else if (Math.floor(Math.random() * 2) === 1 && this.y !== playerObject.y) {
            if (this.y > playerObject.height + playerObject.y) {
                this.element.querySelector(".iconEnemySpecial").style.backgroundImage = "url(../images/skelly_up.png)"
                this.y -= this.velocity;
                if (this.y < playerObject.height + playerObject.y) {
                    this.y = playerObject.height + playerObject.y;
                };
                this.element.style.top = `${this.y}px`;
            } else if (this.y + this.height < playerObject.y) {
                this.element.querySelector(".iconEnemySpecial").style.backgroundImage = "url(../images/skelly_down.png)"
                this.y += this.velocity;
                if (this.y + this.height > playerObject.y) {
                    this.y = playerObject.y - this.height;
                };
                this.element.style.top = `${this.y}px`;
            };
        };
    };

    attack1(objectGame) {
        if (!objectGame.gameOver) {
            if (this.enemyCollission(objectGame)) {
                if (Math.floor(Math.random() * 10) === 0) {
                    if (audioEnemySlash.paused) {
                        audioEnemySlash.play();
                    } else {
                        audioEnemySlash.currentTime = 0;
                    };
                    objectGame.life -= this.attack;
                    if (objectGame.life <= 0) {
                        if (audioDead.paused) {
                            audioDead.play();
                        } else {
                            audioDead.currentTime = 0;
                        };
                        audioGame.pause();
                        audioGame.currentTime = 0;
                        if (audioDead.paused) {
                            audioGameOver.play();
                        } else {
                            audioGameOver.currentTime = 0;
                        };
                        objectGame.element.remove();
                        objectGame.gameOver = true;
                    };
                    objectGame.element.querySelector(".health-bar").style.width = `${objectGame.life}%`
                };
            };
        };
    };
};

class fieldObject {
    constructor(classObject) {
        this.classObject = classObject;
        // Define Boundaries
        this.gameAreaElement = document.querySelector("#game-area");
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Define Position
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.createElement()
    };

    createElement() {
        if (this.classObject === 'lake') {
            this.element = document.createElement("div")
            this.element.classList.add("lake_surroundings");
            this.gameAreaElement.appendChild(this.element);
            this.element1 = document.createElement("div");
            this.element1.classList.add(this.classObject);
            this.element.appendChild(this.element1);
            this.height = this.element.getBoundingClientRect().height;
            this.width = this.element.getBoundingClientRect().width;
        } else if (this.classObject === 'lake1') {
            this.classObject === 'lake1';
            this.element = document.createElement("div");
            this.element.classList.add("lake_surroundings1");
            this.gameAreaElement.appendChild(this.element);
            this.element1 = document.createElement("div");
            this.element1.classList.add(this.classObject);
            this.element.appendChild(this.element1);
            this.height = this.element.getBoundingClientRect().height;
            this.width = this.element.getBoundingClientRect().width;
        } else {
            this.element = document.createElement("div");
            this.element.classList.add(this.classObject);
            this.gameAreaElement.appendChild(this.element);
            this.height = this.element.getBoundingClientRect().height;
            this.width = this.element.getBoundingClientRect().width;
        };
    };

    move(coordinateY, coordinateX) {
        this.y = coordinateY;
        this.x = coordinateX;
        this.element.style.top = `${coordinateY}px`;
        this.element.style.left = `${coordinateX}px`;
    }
};

class fireBall {
    constructor() {
        // Define Boundaries
        this.gameAreaElement = document.querySelector("#game-area");
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Define Position
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.direction = 'down';
        this.velocity = 20;
        this.attack = 25;
    };

    createElement(gameObject) {
        if (gameObject.mana >= 20) {
            this.element = document.createElement("div");
            mainLibraryObjects.arrayFireBalls.push(this);
            this.element.classList.add("fireBall");
            this.gameAreaElement.appendChild(this.element);
            this.height = this.element.getBoundingClientRect().height;
            this.width = this.element.getBoundingClientRect().width;
            this.direction = gameObject.currentDirection;
            if (this.direction === "up") {
                this.element.style.transform = "rotate(-90deg)";
                this.y = gameObject.y - this.height;
                this.x = gameObject.x + gameObject.width / 2 - this.width / 2
            } else if (this.direction === "down") {
                this.element.style.transform = "rotate(90deg)";
                this.y = gameObject.y + gameObject.height;
                this.x = gameObject.x + gameObject.width / 2 - this.width / 2
            } else if (this.direction === "left") {
                this.element.style.transform = "rotate(180deg)";
                this.y = gameObject.y + gameObject.height / 2 - this.height / 2;
                this.x = gameObject.x - this.width;
            } else if (this.direction === "right") {
                this.y = gameObject.y + gameObject.height / 2 - this.height / 2;
                this.x = gameObject.x + gameObject.width;
            }
            this.element.style.top = `${this.y}px`;
            this.element.style.left = `${this.x}px`;
            gameObject.mana -= 20;
            gameObject.element.querySelector(".mana-bar").style.width = `${gameObject.mana}%`
        };
    };

    move(i) {
        if (this.direction === "up") {
            this.y -= this.velocity;
            this.element.style.top = `${this.y}px`;
            if (this.y <= 0) {
                this.element.style.backgroundImage = "url(../images/explosion.png)";
                this.element.style.backgroundSize = "100% 100%";
                this.element.style.height = "100px";
                this.element.style.top = `${this.y - 20}px`
                setTimeout(() => {
                    this.element.remove();
                }, 300);
                mainLibraryObjects.arrayFireBalls.splice(i, 1);
            }
        } else if (this.direction === "down") {
            this.y += this.velocity;
            this.element.style.top = `${this.y}px`;
            if (this.y + this.height >= this.gameAreaHeight) {
                this.element.style.backgroundImage = "url(../images/explosion.png)";
                this.element.style.backgroundSize = "100% 100%";
                this.element.style.height = "100px";
                this.element.style.top = `${this.y - 20}px`
                setTimeout(() => {
                    this.element.remove();
                }, 300);
                mainLibraryObjects.arrayFireBalls.splice(i, 1);
            }
        } else if (this.direction === "left") {
            this.x -= this.velocity;
            this.element.style.left = `${this.x}px`;
            if (this.x <= 0) {
                this.element.style.backgroundImage = "url(../images/explosion.png)";
                this.element.style.backgroundSize = "100% 100%";
                this.element.style.height = "100px";
                this.element.style.top = `${this.y - 20}px`
                setTimeout(() => {
                    this.element.remove();
                }, 300);
                mainLibraryObjects.arrayFireBalls.splice(i, 1);
            }
        } else if (this.direction === "right") {
            this.x += this.velocity;
            this.element.style.left = `${this.x}px`;
            if (this.x + this.width >= this.gameAreaWidth) {
                this.element.style.backgroundImage = "url(../images/explosion.png)";
                this.element.style.backgroundSize = "100% 100%";
                this.element.style.height = "100px";
                this.element.style.top = `${this.y - 20}px`
                setTimeout(() => {
                    this.element.remove();
                }, 300);
                mainLibraryObjects.arrayFireBalls.splice(i, 1);
            }
        };
    };

    fireBallCollission(collisionObject, i, j, playerObject) {
        if (
            (
                // Checks right upper corner of player agains enemy width position
                (
                    this.x >= collisionObject.x
                    && this.x <= collisionObject.x + collisionObject.width
                )
                //  Checks left upper corner of player element against enemy width position
                || (
                    this.x + this.width <= collisionObject.width + collisionObject.x
                    && this.x + this.width >= collisionObject.x
                )
            )
            && (
                // Checks upper left corner of player agains enemy height position
                (
                    this.y >= collisionObject.y
                    && this.y <= collisionObject.y + collisionObject.height
                )
                // Checks lower left corner of player agains enemy height position
                || (
                    this.y + this.height <= collisionObject.y + collisionObject.height
                    && this.y + this.height >= collisionObject.y
                )
            )
        ) {
            this.element.style.backgroundImage = "url(../images/explosion.png)";
            this.element.style.backgroundSize = "100% 100%";
            this.element.style.height = "100px";
            this.element.style.top = `${this.y - 20}px`
            setTimeout(() => {
                this.element.remove();
            }, 300);
            mainLibraryObjects.arrayFireBalls.splice(i, 1);
            if (collisionObject.element.classList[0] === 'enemy') {
                collisionObject.life -= this.attack;
                collisionObject.element.querySelector(".health-barEnemy").style.width = `${collisionObject.life}%`
                if (collisionObject.life <= 0) {
                    if (audioKill.paused) {
                        audioKill.play();
                    } else {
                        audioKill.currentTime = 0;
                    };
                    enemyCounter++;
                    mainLibraryObjects.arrayEnemy.splice(j, 1);
                    collisionObject.element.remove();
                    playerObject.score += 10;
                    console.log(`Score is ${playerObject.score}`)
                    playerObject.life += 30;
                    playerObject.mana += 40;
                    if (playerObject.life > 100) {
                        playerObject.life = 100;
                    };
                    if (playerObject.mana > 100) {
                        playerObject.mana = 100
                    };
                    playerObject.element.querySelector(".mana-bar").style.width = `${playerObject.mana}%`
                    playerObject.element.querySelector(".health-bar").style.width = `${playerObject.life}%`
                };
            };
            if (collisionObject.element.classList[0] === 'enemySpecial') {
                collisionObject.life -= this.attack;
                collisionObject.element.querySelector(".health-barEnemySpecial").style.width = `${collisionObject.life / 5}%`
                if (collisionObject.life <= 0) {
                    if (audioKill.paused) {
                        audioKill.play();
                    } else {
                        audioKill.currentTime = 0;
                    };
                    enemyCounter++;
                    mainLibraryObjects.arrayEnemy.splice(j, 1);
                    collisionObject.element.remove();
                    playerObject.score += 100;
                    console.log(`Score is ${playerObject.score}`)
                    playerObject.life += 100;
                    playerObject.mana += 100;
                    if (playerObject.life > 100) {
                        playerObject.life = 100;
                    };
                    if (playerObject.mana > 100) {
                        playerObject.mana = 100
                    };
                    playerObject.element.querySelector(".mana-bar").style.width = `${playerObject.mana}%`
                    playerObject.element.querySelector(".health-bar").style.width = `${playerObject.life}%`
                };
            };
        };
    };
};