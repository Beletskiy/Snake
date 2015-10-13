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
CanvasDrawer.prototype.showStatus = function(message , player1Score, player2Score) {
    this.ctx.strokeStyle = "red";
    this.ctx.font = "30px Arial";
    this.ctx.strokeText(message, this.canvasField.width/3, this.canvasField.width/10);
    this.ctx.strokeText("Player1 score - " + player1Score, this.canvasField.width/3, this.canvasField.width/5);
    this.ctx.strokeText("Player2 score - " + player2Score, this.canvasField.width/3, this.canvasField.width/3);
};
