/*--------------------------------------------------visualization-------------------------------------------*/
/*--------------------------------------------------CanvasDrawer-------------------------------------------*/
function CanvasDrawer () {
    this.cellSize = 20;
    this.canvasField = document.getElementById("canvasGameField");
    this.ctx = this.canvasField.getContext('2d');
}
CanvasDrawer.prototype.drawCanvasField = function () {
    var cellSize = this.cellSize,
        ctx = this.ctx;

    this.canvasField.width = 400;
    this.canvasField.height = 400;
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

/*---------------------------------------------------logic--------------------------------------------------*/
function Game () {
    this.drawer = new CanvasDrawer();

}

function Food() {
    this.drawer = new CanvasDrawer();
    this.position = {
        x : -1,         //outside of the field
        y : -1
    };
    this.randomGenerate();
}
Food.prototype.update = function (newPos) {
    this.drawer.drawFood(newPos);
};
Food.prototype.randomGenerate = function() {
    var self = this,
        newPos = {
        x: Math.floor(Math.random() * 20), //suppose, we have 20 cells in our field
        y: Math.floor(Math.random() * 20)
    };
    if ((newPos.x == this.position.x) && (newPos.y == this.position.y)) {
        this.randomGenerate();
    }
    // ------------------need to add check not on snake--------------------??
    for (var i = 0; i < snake.snakeBody.length; i++) {
        if ((newPos.x == snake.snakeBody[i].x) && (newPos.y == snake.snakeBody[i].y)) {
            this.randomGenerate();
        }
    }
    self.update(newPos);
    this.position.x = newPos.x;
    this.position.y = newPos.y;
};

function Snake() {
    this.drawer = new CanvasDrawer();
    var defaultPosX = 10; //on center of the field...
    var defaultPosY = 10;

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
Snake.prototype.update = function (snakeBody) {
    this.drawer.drawSnake(snakeBody);
};

/*--------------------------------------end of logic------------------------------------------*/
var game = new Game();
game.drawer.drawCanvasField();
var snake = new Snake();
var food = new Food();

