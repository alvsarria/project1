// Define player object
class gamePlayer {
    constructor(gameAreaElement) {
        // Define Element
        this.element = document.querySelector("#player");
        // Define Size
        this.height = this.element.getBoundingClientRect().height;
        this.width = this.element.getBoundingClientRect().width;
        // Define Boundaries
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Define Position
        this.y = 0;
        this.x = 0;
        // Movement Properties
        this.direction = [false, false, false, false];
        this.velocity = 10;
        this.distance = null;
    };

    move() {
        // Moving up + game boundaries
        if (this.direction[0]) {
            if (this.y <= 0) {
                this.y = 0;
                this.element.style.top = `${this.y}px`;
            } else {
                this.y -= this.velocity;
                this.element.style.top = `${this.y}px`;
            }
            // Moving down + game boundaries
        } if (this.direction[1]) {
            if (this.y >= (this.gameAreaHeight - this.height)) {
                this.y = this.gameAreaHeight - this.height;
                this.element.style.top = `${this.y}px`;
            } else {
                this.y += this.velocity;
                this.element.style.top = `${this.y}px`;
            }
            // Moving left + game boundaries
        } if (this.direction[2]) {
            if (this.x <= 0) {
                this.x = 0;
                this.element.style.left = `${this.x}px`;
            } else {
                this.x -= this.velocity;
                this.element.style.left = `${this.x}px`;
            }
            // Moving right + game boundaries
        } if (this.direction[3]) {
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
                };
                return true;
            };
        } else {
            return false;
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
        this.velocity = 10;
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
    };

    createElement(classObject) {
        this.element = document.createElement("div");
        this.element.classList.add(classObject);
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
                };
                return true;
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
                this.x -= this.velocity;
                if (this.x < playerObject.width + playerObject.x) {
                    this.x = playerObject.width + playerObject.x;
                };
                this.element.style.left = `${this.x}px`;
            } else if (this.x + this.width < playerObject.x) {
                this.x += this.velocity;
                if (this.x + this.width > playerObject.x) {
                    this.x = playerObject.x - this.width;
                };
                this.element.style.left = `${this.x}px`;
            };
            // randomly moves the enemy on the Y axis towards the player direction
        } else if (Math.floor(Math.random() * 2) === 1 && this.y !== playerObject.y) {
            if (this.y > playerObject.height + playerObject.y) {
                this.y -= this.velocity;
                if (this.y < playerObject.height + playerObject.y) {
                    this.y = playerObject.height + playerObject.y;
                };
                this.element.style.top = `${this.y}px`;
            } else if (this.y + this.height < playerObject.y) {
                this.y += this.velocity;
                if (this.y + this.height > playerObject.y) {
                    this.y = playerObject.y - this.height;
                };
                this.element.style.top = `${this.y}px`;
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
        //this.createElement();
    };

    createElement(xCoordinate, yCoordinate) {
        this.element = document.createElement("div");
        this.element.classList.add(this.classObject);
        // remember the bug we had in class? We have to append the element to the game area before we can get its width and height!
        this.gameAreaElement.appendChild(this.element);

        this.element.style.top = `${yCoordinate}px`;
        this.element.style.left = `${xCoordinate}px`;
        this.y = yCoordinate;
        this.x = xCoordinate;
        this.height = this.element.getBoundingClientRect().height;
        this.width = this.element.getBoundingClientRect().width;
    };
};