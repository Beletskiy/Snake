/*--------------------------------------------------visualization-------------------------------------------*/
/*--------------------------------------------------CanvasDrawer-------------------------------------------*/
function CanvasDrawer () {
    this.cellSize = 20;
    this.numberOfCells = 20;
    this.canvasField = document.getElementById("canvasGameField");
    this.ctx = this.canvasField.getContext('2d');
}
CanvasDrawer.prototype.drawField = function () {
    var ctx = this.ctx;

    this.canvasField.width = this.cellSize*this.numberOfCells;
    this.canvasField.height = this.cellSize*this.numberOfCells;
    ctx.strokeStyle = 'green';
    ctx.strokeRect(0, 0, this.canvasField.width, this.canvasField.height);
};
CanvasDrawer.prototype.drawFood = function (foodPosition) {
    var x = foodPosition.x,
        y = foodPosition.y;

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(x*this.cellSize+1, y*this.cellSize+1, this.cellSize-1, this.cellSize-1);
};
CanvasDrawer.prototype.drawSnake = function (snakeBody) {//snakeBody - some object "snakeBody"

    var headX = snakeBody[0].x,
        headY = snakeBody[0].y,
        snakeLength = snakeBody.length;

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(headX*this.cellSize, headY*this.cellSize, this.cellSize, this.cellSize);
    for (var i = 1; i < snakeLength; i++) {
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(snakeBody[i].x*this.cellSize, snakeBody[i].y*this.cellSize, this.cellSize, this.cellSize);
    }
};
CanvasDrawer.prototype.clearField = function() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.cellSize*this.numberOfCells, this.cellSize*this.numberOfCells);
};
CanvasDrawer.prototype.showStatus = function(message,score) {
    this.ctx.strokeStyle = "red";
    this.ctx.font = "30px Arial";
    this.ctx.strokeText(message, this.canvasField.width/3, this.canvasField.width/5);
    this.ctx.strokeText("Your score - " + score, this.canvasField.width/3, this.canvasField.width/3);
};

/*---------------------------------------------------logic--------------------------------------------------*/
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
function Food(game) {
    this.game = game;
    this.drawer = new CanvasDrawer();
    this.position = {
        x : -1,         //outside of the field
        y : -1
    };
    this.randomGenerate();
}
Food.prototype.update = function (newPos) {
    (function () {
        this.position = newPos;
    })();
    this.drawer.drawFood(this.position);
};
Food.prototype.randomGenerate = function() {
    var newPos = {
        x: Math.floor(Math.random() * this.drawer.numberOfCells),
        y: Math.floor(Math.random() * this.drawer.numberOfCells)
        },
        snakeBodyLength = this.game.snake.snakeBody.length;
    // ------------------check generate food not on previous position ----------------
    if ((newPos.x == this.position.x) && (newPos.y == this.position.y)) {
        this.randomGenerate();
    }
    // ------------------ check generate food not on the snake------------------------
    for (var i = 0; i < snakeBodyLength; i++) {
        if ((newPos.x == this.game.snake.snakeBody[i].x) && (newPos.y == this.game.snake.snakeBody[i].y)) {
            this.randomGenerate();
        }
    }
    this.update(newPos);
    this.position.x = newPos.x;
    this.position.y = newPos.y;
};

function Snake(game) {
    this.game = game;
    this.drawer = new CanvasDrawer();
    var defaultPosX = this.drawer.numberOfCells/2; //on the center of the field...
    var defaultPosY = this.drawer.numberOfCells/2;

    this.snakeBody = [
        {x: defaultPosX, y: defaultPosY - 1},
        {x: defaultPosX, y: defaultPosY}
    ];
    this.ROUTE = {
        UP: 2,
        DOWN: 0,
        LEFT: 1,
        RIGHT: 3
    };
    this.setRoute('UP');
    this.update(this.snakeBody);
}
Snake.prototype.setRoute = function (value) {
    this.route = this.ROUTE[value];
};

Snake.prototype.isRoute = function(value) {
    return this.route == this.ROUTE[value];
};

Snake.prototype.getSnakeBodyLength = function() {
    return this.snakeBody.length;
};

Snake.prototype.update = function (snakeBody) {
    var newSnakeElement = {
        x: this.snakeBody[0].x,
        y: this.snakeBody[0].y
    };

    // update position
    if (this.isRoute('UP')) {
        newSnakeElement.y -= 1;
    } else if (this.isRoute('DOWN')) {
        newSnakeElement.y += 1;
    } else if (this.isRoute('LEFT')) {
        newSnakeElement.x -= 1;
    } else if (this.isRoute('RIGHT')) {
        newSnakeElement.x += 1;
    }
    // if newSnakeElement is on itself
    for (var i = 0; i < this.getSnakeBodyLength() ; i++) {
        if ((newSnakeElement.x == this.snakeBody[i].x) && (newSnakeElement.y == this.snakeBody[i].y)) {
            this.game.setStatus(this.game.STATUS.GAMEOVER);
            this.drawer.showStatus("Game over");
            this.updateSnakeArr(newSnakeElement);
            return false;
        }
    }
    // if newSnakeElement is outside of scene
    var isOutsideX = ((newSnakeElement.x < 0) || (newSnakeElement.x > this.drawer.numberOfCells -1));
    var isOutsideY = ((newSnakeElement.y < 0) || (newSnakeElement.y > this.drawer.numberOfCells - 1));

    if (isOutsideX || isOutsideY) {
        this.game.setStatus(this.game.STATUS.GAMEOVER);
        this.drawer.showStatus("Game over", this.game.score);
        this.updateSnakeArr(newSnakeElement);
        return false;
    }
    this.updateSnakeArr(newSnakeElement);
    if (this.game.food) {
        if (newSnakeElement.x == this.game.food.position.x && newSnakeElement.y == this.game.food.position.y) {
            this.game.score++;

            // check for win
            var isWin = this.addElement();
            if (isWin) {
                this.game.setStatus(this.game.STATUS.GAMEWIN);
                this.drawer.showStatus("You win!!! ", this.game.score);
            } else {
                // new food
                this.game.food.randomGenerate();
            }
        }
    }
};

Snake.prototype.updateSnakeArr = function (newSnakeElement) {
    this.snakeBody.pop();
    this.snakeBody.unshift(newSnakeElement);
    this.drawer.drawSnake(this.snakeBody);
};

Snake.prototype.addElement = function() {
    // get place to adding
    var last_index = this.snakeBody.length - 1,
        newSnakeElement = {
        x: this.snakeBody[last_index].x,
        y: this.snakeBody[last_index].y
    };

    var x_diff = this.snakeBody[last_index].x - this.snakeBody[last_index - 1].x;
    var y_diff = this.snakeBody[last_index].y - this.snakeBody[last_index - 1].y;

    if (x_diff > 0) {
        newSnakeElement.x += 1;
    } else if (x_diff < 0) {
        newSnakeElement.x -= 1;
    } else if (y_diff > 0) {
        newSnakeElement.y += 1;
    } else if (y_diff < 0) {
        newSnakeElement.y -= 1;
    }

    this.snakeBody.push(newSnakeElement);

    // check on win
    if (this.getSnakeBodyLength() == this.drawer.numberOfCells/2) {
        return true;
    }
};

/*--------------------------------------end of logic------------------------------------------*/
var game = new Game();

function start() {
    setInterval(main, 1000/2);
}

// main game loop
function main() {
    game.update();
}

document.addEventListener('keydown', function(e) {
    game.handleInput(e);
});

start();


