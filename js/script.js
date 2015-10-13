function Game () {
    this.drawer = new CanvasDrawer();
   // this.score = 0;
    this.status = 0;
    this.STATUS = {
        PLAY: 0,
        NONE: 1,
        GAMEOVER: 2,
        GAMEWIN: 3,
        PAUSE: 4
    };
    this.drawer.drawField();
    this.snake = [];
    this.snake[0] = new Snake(this);
    this.snake[1] = new Snake(this);
    this.food = new Food(this);
}
Game.prototype.setStatus = function(value) {
    this.status = value;
};

Game.prototype.getStatus = function() {
    return this.status;
};

Game.prototype.update = function() {
    if (this.getStatus() == this.STATUS.PLAY) {
        this.drawer.clearField();
        this.drawer.drawField();
        this.snake[0].update();
        this.snake[1].update();
        this.food.update();
    }
  //  input.isLock = false;
    this.snake[0].isLock = false;
    this.snake[1].isLock = false;
};
Game.prototype.handleInput = function () {
    if (this.getStatus() == this.STATUS.PLAY) {
        //     input.isLock = true;
// to do mapping ???
        if (!this.snake[0].isLock) {
            if (input.isKey('UP')) {
                this.snake[0].setRoute('UP');
                this.snake[0].isLock = true;
            } else if (input.isKey('DOWN')) {
                this.snake[0].setRoute('DOWN');
                this.snake[0].isLock = true;
            } else if (input.isKey('LEFT')) {
                this.snake[0].setRoute('LEFT');
                this.snake[0].isLock = true;
            } else if (input.isKey('RIGHT')) {
                this.snake[0].setRoute('RIGHT');
                this.snake[0].isLock = true;
            }
        }
        if (!this.snake[1].isLock) {
            if (input.isKey('w')) {
                this.snake[1].setRoute('UP');
                this.snake[1].isLock = true;
            } else if (input.isKey('s')) {
                this.snake[1].setRoute('DOWN');
                this.snake[1].isLock = true;
            } else if (input.isKey('a')) {
                this.snake[1].setRoute('LEFT');
                this.snake[1].isLock = true;
            } else if (input.isKey('d')) {
                this.snake[1].setRoute('RIGHT');
                this.snake[1].isLock = true;
            }
        }
    }
};
Game.prototype.calculateAllScores = function () {
    this.drawer.showStatus("Game over", this.snake[0].score, this.snake[1].score);
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

start(1000);


