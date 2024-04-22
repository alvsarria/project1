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
        // Other Properties
        this.movementState = false;
        this.direction = null;
        this.velocity = 10;
        this.lastDirection = null;
    };

    move() {
        if (this.movementState) {
            if (this.direction === 'up') {
                if (this.y <= 0) {
                    this.movementState -= false;
                    this.y = 0;
                    this.element.style.top = `${this.y}px`;
                } else {
                    this.y -= this.velocity;
                    this.element.style.top = `${this.y}px`;
                }
            } else if (this.direction === 'down') {
                if (this.y >= (this.gameAreaHeight - this.height)) {
                    this.movementState -= false;
                    this.y = this.gameAreaHeight - this.height;
                    this.element.style.top = `${this.y}px`;
                } else {
                    this.y += this.velocity;
                    this.element.style.top = `${this.y}px`;
                }
            } else if (this.direction === 'left') {
                if (this.x <= 0) {
                    this.movementState -= false;
                    this.x = 0;
                    this.element.style.left = `${this.x}px`;
                } else {
                    this.x -= this.velocity;
                    this.element.style.left = `${this.x}px`;
                }
            } else if (this.direction === 'right') {
                if (this.x >= (this.gameAreaWidth - this.width)) {
                    this.movementState -= false;
                    this.x = this.gameAreaWidth - this.width;
                    console.log(this.gameAreaWidth, this.width);
                    this.element.style.left = `${this.x}px`;
                } else {
                    this.x += this.velocity;
                    this.element.style.left = `${this.x}px`;
                };
            };
        };
    };
};