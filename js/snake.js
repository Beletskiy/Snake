function Snake(game) {
    this.game = game;
    this.drawer = new CanvasDrawer();
    var defaultPosX = this.drawer.numberOfCells/ 2, //on the center of the field...
        defaultPosY = this.drawer.numberOfCells/2;

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
    this.isLock = false; //
    this.score = 0; //
}
Snake.prototype.setRoute = function (value) {
    this.route = this.ROUTE[value];
};

Snake.prototype.isRoute = function(value) {
    return this.route == this.ROUTE[value];
};

Snake.prototype.update = function () {
    var newSnakeElement = {
        x: this.snakeBody[0].x,
        y: this.snakeBody[0].y
        },
        snakeBodyLength = this.snakeBody.length,
        isOutsideX ,
        isOutsideY ,
        hasFood = this.game.food,
        isWin = false;

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

    isOutsideX = ((newSnakeElement.x < 0) || (newSnakeElement.x > this.drawer.numberOfCells -1));
    isOutsideY = ((newSnakeElement.y < 0) || (newSnakeElement.y > this.drawer.numberOfCells - 1));

    // if newSnakeElement is on itself or outside of scene
    for (var i = 0; i < snakeBodyLength ; i++) {
        if ((newSnakeElement.x == this.snakeBody[i].x) && (newSnakeElement.y == this.snakeBody[i].y)
        || (isOutsideX || isOutsideY)) {
            this.score = 0;
            this.game.createMessage("Game over");
            this.updateSnakeArr(newSnakeElement);
            this.game.setStatus(this.game.STATUS.GAMEOVER);
            return false;
        }
    }
    this.updateSnakeArr(newSnakeElement);

    if (hasFood) {
        if ((newSnakeElement.x == this.game.food.position.x) && (newSnakeElement.y == this.game.food.position.y)) {
            this.score++;

            isWin = this.addElement();
            if (isWin) {                                       // check for win
                this.game.setStatus(this.game.STATUS.GAMEWIN);
                this.game.createMessage("win!!!");
            } else {
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
    var lastIndex = this.snakeBody.length - 1,
        newSnakeElement = {
            x: this.snakeBody[lastIndex].x,
            y: this.snakeBody[lastIndex].y
        },
        xDiff = this.snakeBody[lastIndex].x - this.snakeBody[lastIndex - 1].x,
        yDiff = this.snakeBody[lastIndex].y - this.snakeBody[lastIndex - 1].y;

    if (xDiff > 0) {
        newSnakeElement.x += 1;
    } else if (xDiff < 0) {
        newSnakeElement.x -= 1;
    } else if (yDiff > 0) {
        newSnakeElement.y += 1;
    } else if (yDiff < 0) {
        newSnakeElement.y -= 1;
    }

    this.snakeBody.push(newSnakeElement);

    // check on win
    if (this.snakeBody.length == this.drawer.numberOfCells/2) {
        return true;
    }
};