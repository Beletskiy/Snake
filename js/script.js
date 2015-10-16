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
                this.createMessage("Game over");
            }   else {
                this.checkWinning(this.snake[i]);
            }
            if (this.snake[i].isFull) {
                this.food.randomGenerate();
                this.snake[i].isFull = false;
            }
        }
        this.food.update();
        this.drawer.drawFood(this.food.position);
    }
  /*  for (i = 0; i < this.numberOfSnakes; i++) {
        //if (!this.snake[i].isAlive)){
        //    this.setStatus()
        //}
        this.snake[i].isLock = false;
    } */
    // todo redraw all ---------------------------------ready------------------------------------
};
Game.prototype.checkWinning = function(snake) {
    if (snake.snakeBody.length == this.numberOfCells/2) {
        this.setStatus(this.STATUS.GAMEWIN);
        this.createMessage("win!!!");
    }
};
Game.prototype.handleInput = function () {

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

        if (this.snake[1].isAlive) {

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

            for (var j = 0; j < allowedKeys.length; j++) {
                var keysArray = allowedKeys[j];
                //for (var i = 0; i < keysArray.length; i++) {
                //    var key = keysArray[i];
                this.snake[j].setRoute(input.isKeyInArray(keysArray));
                return false;
                //}
            }

     /*       if (input.isKey('UP')) {
                this.snake[1].setRoute('UP');
            } else if (input.isKey('DOWN')) {
                this.snake[1].setRoute('DOWN');
            } else if (input.isKey('LEFT')) {
                this.snake[1].setRoute('LEFT');
            } else if (input.isKey('RIGHT')) {
                this.snake[1].setRoute('RIGHT');
            }  */
        }

    /*    if (this.snake[0].isAlive) {

            if (input.isKey('w')) {
                this.snake[0].setRoute('UP');
            } else if (input.isKey('s')) {
                this.snake[0].setRoute('DOWN');
            } else if (input.isKey('a')) {
                this.snake[0].setRoute('LEFT');
            } else if (input.isKey('d')) {
                this.snake[0].setRoute('RIGHT');
            }
        } */
    }
};
Game.prototype.createMessage = function (message) {
    if (message == 'Game over') {
        this.drawer.showStatus(message, this.snake[0].score, this.snake[1].score);
        return false;
    }

    var winnerIndex = (this.snake[0].score > this.snake[1].score) ? 0 : 1,
        winner = this.snake[winnerIndex];
        //message = this.messages[winnerIndex]

    // todo read about array.map, array.reduce


    this.drawer.showStatus("Player1 win!", this.snake[0].score, this.snake[1].score);

    if (this.snake[0].score > this.snake[1].score) {
        this.drawer.showStatus("Player1 win!", this.snake[0].score, this.snake[1].score);
    }
    if (this.snake[0].score < this.snake[1].score) {
        this.drawer.showStatus("Player2 win!", this.snake[0].score, this.snake[1].score);
    }
};

/*Game.prototype.checkSnakesCollision = function () {
    for (var i = 0; i < this.numberOfSnakes; i++) {
        if (this.snake[i].snakeBody[0].x =
    }
}; */

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


