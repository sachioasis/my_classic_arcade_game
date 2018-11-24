const PLAYER_DEFAULT_POSITION_X = 200;
const PLAYER_DEFAULT_POSITION_Y = 380;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemy goes back to right position after going out from the canvas
    if (this.x > 510) {
        this.x = -95;
        this.speed = Math.floor((Math.random() * 300) + 100);
    }

    // Check whether the player hits the enemy
    if (player.x < this.x + 70 && player.x > this.x - 35 &&
        player.y < this.y + 25 && 30 + player.y > this.y) {
        player.x = PLAYER_DEFAULT_POSITION_X;
        player.y = PLAYER_DEFAULT_POSITION_Y;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Initializing x, y, and speed here
    this.x = PLAYER_DEFAULT_POSITION_X;
    this.y = PLAYER_DEFAULT_POSITION_Y;
    this.speed = 50;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    // Player always needs to be within the canvas
    if (this.y > 380)
        this.y = 380;
    
    if (this.x > 400)
        this.x = 400;
    
    if (this.x < 0)
        this.x = 0;
    
    // If the player reaches the river (case for winning thie game)
    if (this.y < 0) {
        this.x = PLAYER_DEFAULT_POSITION_X;
        this.y = PLAYER_DEFAULT_POSITION_Y;
    }
};

Player.prototype.handleInput = function(keyPress) {

    // Changing the position based on keyPress
    switch (keyPress) {
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy1 = new Enemy(-100, 60, 250);
var enemy2 = new Enemy(-100, 140, 400);
var enemy3 = new Enemy(-100, 220, 150);

var player = new Player();
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
