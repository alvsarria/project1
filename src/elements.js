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
        }  if (this.direction[1]) {
            if (this.y >= (this.gameAreaHeight - this.height)) {
                this.y = this.gameAreaHeight - this.height;
                this.element.style.top = `${this.y}px`;
            } else {
                this.y += this.velocity;
                this.element.style.top = `${this.y}px`;
            }
            // Moving left + game boundaries
        }  if (this.direction[2]) {
            if (this.x <= 0) {
                this.x = 0;
                this.element.style.left = `${this.x}px`;
            } else {
                this.x -= this.velocity;
                this.element.style.left = `${this.x}px`;
            }
            // Moving right + game boundaries
        }  if (this.direction[3]) {
            if (this.x >= (this.gameAreaWidth - this.width)) {
                this.x = this.gameAreaWidth - this.width;
                this.element.style.left = `${this.x}px`;
            } else {
                this.x += this.velocity;
                this.element.style.left = `${this.x}px`;
            };
        };
    };
};

class gameEnemy {
    constructor(gameAreaElement) {
        // Define Element
        this.element = document.querySelector("#enemy");
        // Define Size
        this.height = this.element.getBoundingClientRect().height;
        this.width = this.element.getBoundingClientRect().width;
        // Define Boundaries
        this.gameAreaHeight = gameAreaElement.getBoundingClientRect().height;
        this.gameAreaWidth = gameAreaElement.getBoundingClientRect().width;
        // Define Position
        this.y = this.gameAreaHeight / 2;
        this.x = this.gameAreaWidth / 2;
        // Movement Properties
        this.direction = [false, false, false, false];
        this.velocity = 10;
        this.idleVelocity = this.velocity/2;
        this.idleRadius = 150;
        this.ChaseRadius = 50000;
    };
};