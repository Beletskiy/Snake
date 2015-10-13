function Game () {
    this.drawer = new CanvasDrawer();
    this.score = 0;
    this.status = 0;
    this.STATUS = {
        PLAY: 0,
        NONE: 1,
        GAMEOVER: 2,
        GAMEWIN: 3,
        PAUSE: 4
    };
    this.drawer.drawField();
    this.snake = new Snake(this);
    this.food = new Food(this);
}
Game.prototype.setStatus = function(value) {
   // this.onStatusChange(value, this.status);
    this.status = value;
};

Game.prototype.getStatus = function() {
    return this.status;
};

Game.prototype.update = function() {
    if (this.getStatus() == this.STATUS.PLAY) {
        this.drawer.clearField();
        this.drawer.drawField();
        this.snake.update();
        this.food.update();
    }
    input.isLock = false;
};
Game.prototype.handleInput = function () {
    if (this.getStatus() == this.STATUS.PLAY && !input.isLock) {
        input.isLock = true;

        if ((input.isKey('UP') || input.isKey('w'))) {
            this.snake.setRoute('UP');
        } else if ((input.isKey('DOWN') || input.isKey('s'))) {
            this.snake.setRoute('DOWN');
        } else if ((input.isKey('LEFT') || input.isKey('a'))) {
            this.snake.setRoute('LEFT');
        } else if ((input.isKey('RIGHT') || input.isKey('d'))) {
            this.snake.setRoute('RIGHT');
        }
    }
};

var game = new Game();
// -----------------------------main game loop ----------------------------
function start(interval) {
    setInterval(main, interval);
}

function main() {
    game.update();
}

document.addEventListener('keydown', function(e) {
    game.handleInput(e);
});

start(500);


