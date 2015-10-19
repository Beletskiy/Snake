function Game () {
    this.activeStatus = 0;
    this.STATUS = {
        PLAY: 0,
        NONE: 1,
        GAMEOVER: 2,
        GAMEWIN: 3,
        PAUSE: 4
    };
    this.numberOfCells = 20;
    this.drawer = new CanvasDrawer();
    this.drawer.redrawField(this.numberOfCells);
    this.snake = [];
    this.numberOfSnakes = 2;
    for (var i = 0; i < this.numberOfSnakes; i++) {
        //this.snake.push({                 player
        //    snake : new Snake(this,i),
        //    keys : [],
        //    options : {}
        //});
        this.snake.push(new Snake(this,i));
    }
    this.food = new Food(this);
}
Game.prototype.setStatus = function(value) {
    this.activeStatus = value;
};

Game.prototype.getStatus = function() {
    return this.activeStatus;
};

Game.prototype.update = function() {
    if (this.getStatus() == this.STATUS.PLAY) {
        this.drawer.redrawField(this.numberOfCells);
        for (var i = 0; i < this.numberOfSnakes; i++) {
            this.snake[i].update();
            this.drawer.drawSnake(this.snake[i].snakeBody);

            if (!this.snake[i].isAlive) {
                this.setStatus(this.STATUS.GAMEOVER);
                this.drawer.showStatus("Game over", this.snake[0].score, this.snake[1].score);
            }   else {
                this.checkWinning(this.snake[i]);
            }
            if (this.snake[i].isFull) {
                this.food.randomGenerate();
                this.snake[i].isFull = false;
             // this.startInterval = this.startInterval/2;
            }
        }
        this.checkSnakesCollision();
        this.food.update();
        this.drawer.drawFood(this.food.position);
    }
    // todo redraw all ---------------------------------ready------------------------------------
};
Game.prototype.checkWinning = function(snake) {
    if (snake.snakeBody.length == this.numberOfCells/2) {
        this.setStatus(this.STATUS.GAMEWIN);
        this.createMessage();
    }
};
Game.prototype.handleInput = function () {

    var allowedKeys = [
        {
            'UP' : 'w',
            'DOWN' : 's',
            'LEFT' : 'a',
            'RIGHT' : 'd'
        },
        {
            'UP' : 'UP',
            'DOWN' : 'DOWN',
            'LEFT' : 'LEFT',
            'RIGHT' : 'RIGHT'
        }
    ];

    if (this.getStatus() == this.STATUS.PAUSE) {
        if (input.isKey('SPACE')) {
            this.setStatus(this.STATUS.PLAY);
            return false;
        }
    }

    if (this.getStatus() == this.STATUS.PLAY) {
        if (input.isKey('SPACE')) {
            this.setStatus(this.STATUS.PAUSE);
            this.drawer.showStatus("PAUSE", this.snake[0].score, this.snake[1].score);
        }
        for (var j = 0; j < allowedKeys.length; j++) {
            var keysArray = allowedKeys[j];
            this.snake[j].setRoute(input.isKeyInArray(keysArray));
        }
    }
};
Game.prototype.createMessage = function () {
    var winnerIndex ;
    if (this.snake[0].score == this.snake[1].score) {
        this.drawer.showStatus("Game over", this.snake[0].score, this.snake[1].score);
        return false;
    }
    winnerIndex = (this.snake[0].score > this.snake[1].score) ? 0 : 1;
    // todo read about array.map, array.reduce ---------------------ready---------------------
    this.drawer.showStatus("Player" + (winnerIndex+1) + " win!", this.snake[0].score, this.snake[1].score);
};

Game.prototype.checkSnakesCollision = function () {
    for (var i = 0; i < this.numberOfSnakes; i++) {
        for (var j = 0; j < this.numberOfSnakes; j++) {
            if (i !== j) {
                for (var k = 0; k < this.snake[j].snakeBody.length; k++) {
                    if ((this.snake[i].snakeBody[0].x == this.snake[j].snakeBody[k].x) &&
                        (this.snake[i].snakeBody[0].y == this.snake[j].snakeBody[k].y)) {
                            this.snake[i].score = 0;
                            this.snake[i].isAlive = false;
                            this.snake[j].isAlive = false;
                            this.setStatus(this.STATUS.GAMEOVER);
                            this.createMessage();
                    }
                }
            }
        }
    }
};

var game = new Game();
// -----------------------------main game loop ----------------------------
function start(startInterval) {
    setInterval(main, startInterval);
}

function main() {
    game.update();
}

document.addEventListener('keydown', function(e) {
    game.handleInput(e);
});
start(500);


