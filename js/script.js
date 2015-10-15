function Game () {
    this.drawer = new CanvasDrawer();
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
    this.numberOfSnakes = 2;
    for (var i = 0; i < this.numberOfSnakes; i++) {
        this.snake[i] = new Snake(this);
    }
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
        for (var i = 0; i < this.numberOfSnakes; i++) {
            this.snake[i].update();
        }
        this.food.update();
    }
    for (var i = 0; i < this.numberOfSnakes; i++) {
        this.snake[i].isLock = false;
    }
};
Game.prototype.handleInput = function () {
    if (this.getStatus() == this.STATUS.PLAY) {
// to do mapping ???
        if (!this.snake[0].isLock) {

            if ((input.isKey('UP')) || (input.isKey('DOWN')) || (input.isKey('LEFT')) || (input.isKey('RIGHT'))) {
                this.snake[0].isLock = true;
            }

            if (input.isKey('UP')) {
                this.snake[0].setRoute('UP');
            } else if (input.isKey('DOWN')) {
                this.snake[0].setRoute('DOWN');
            } else if (input.isKey('LEFT')) {
                this.snake[0].setRoute('LEFT');
            } else if (input.isKey('RIGHT')) {
                this.snake[0].setRoute('RIGHT');
            }
        }

        if (!this.snake[1].isLock) {

            if ((input.isKey('w')) || (input.isKey('s')) || (input.isKey('a')) || (input.isKey('d'))) {
                this.snake[1].isLock = true;
            }

            if (input.isKey('w')) {
                this.snake[1].setRoute('UP');
            } else if (input.isKey('s')) {
                this.snake[1].setRoute('DOWN');
            } else if (input.isKey('a')) {
                this.snake[1].setRoute('LEFT');
            } else if (input.isKey('d')) {
                this.snake[1].setRoute('RIGHT');
            }
        }
    }
};
Game.prototype.createMessage = function (message) {
    if (message == 'Game over') {
        this.drawer.showStatus(message, this.snake[0].score, this.snake[1].score);
        return false;
    }
    if (this.snake[0].score > this.snake[1].score) {
        this.drawer.showStatus("Player1 win!", this.snake[0].score, this.snake[1].score);
    }
    if (this.snake[0].score < this.snake[1].score) {
        this.drawer.showStatus("Player2 win!", this.snake[0].score, this.snake[1].score);
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

start(1000);


