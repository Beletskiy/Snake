function Snake(game,xStartOffset) {
    this.game = game;
    this.drawer = new CanvasDrawer();
    var defaultPosX = this.drawer.numberOfCells/ 2, //on the center of the field...
        defaultPosY = this.drawer.numberOfCells/2;

    this.snakeBody = [
        {x: defaultPosX + xStartOffset*2, y: defaultPosY - 1},
        {x: defaultPosX + xStartOffset*2, y: defaultPosY}
    ];
    this.ROUTE = {
        UP: 2,
        DOWN: 0,
        LEFT: 1,
        RIGHT: 3
    };
    this.setRoute('UP');
    this.update(this.snakeBody);
    this.isLock = false; // todo disable this
    this.score = 0; //
}
Snake.prototype.setRoute = function (value) {
    if (!value) {
        // todo disallow any invalid routes
        return false;
    }
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

    //var modes = {
    //    normal : {
    //        directions : {
    //            UP : {x : 0, y : -1},
    //            LEFT : {x : -1, y : 0},
    //            DOWN : {x : 0, y : 1},
    //            RIGHT : {x : 1, y : 0}
    //        }
    //    },
    //    superMode : {
    //        directions : {
    //            UP : {x : 0, y : -2},
    //            LEFT : {x : -2, y : 0},
    //            DOWN : {x : 0, y : 2},
    //            RIGHT : {x : 2, y : 0}
    //        };
    //    }
    //}

    //var directions = {
    //    UP : {x : 0, y : -1},
    //    LEFT : {x : -1, y : 0},
    //    DOWN : {x : 0, y : 1},
    //    RIGHT : {x : 1, y : 0}
    //};
    //
    //var activeDirection;
    ////directions = modes[activeMode]
    //if (this.route in directions) {
    //    activeDirection = directions[this.route];
    //    newSnakeElement.y += activeDirection.y;
    //    newSnakeElement.x += activeDirection.x;
    //}
    //
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
            this.game.createMessage("Game over"); // todo remove this
            this.updateSnakeArr(newSnakeElement);
            // todo self only own status here
            this.game.setStatus(this.game.STATUS.GAMEOVER);
            return false;
        }
    }
    // check snake collision ...
   /* this.game.checkSnakesCollision(); */

    this.updateSnakeArr(newSnakeElement);

    if (hasFood) {
        if ((newSnakeElement.x == this.game.food.position.x) && (newSnakeElement.y == this.game.food.position.y)) {
            this.score++;

            isWin = this.addElement();
            if (isWin) {                                       // check for win
                this.game.setStatus(this.game.STATUS.GAMEWIN);
                this.game.createMessage("win!!!");
            } else {
                // todo move this to Game
                this.game.food.randomGenerate();
            }
        }
    }
};

Snake.prototype.updateSnakeArr = function (newSnakeElement) {
    this.snakeBody.pop();
    this.snakeBody.unshift(newSnakeElement);
    this.drawer.drawSnake(this.snakeBody); // todo remove this
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