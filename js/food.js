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
};
Food.prototype.randomGenerate = function() {
    var newPos = {
            x: Math.floor(Math.random() * this.game.numberOfCells),
            y: Math.floor(Math.random() * this.game.numberOfCells)
        },
        numberOfSnakes = this.game.snake.length,
        snakeBodyLength = 0;

    // ------------------check generate food not on previous position ----------------
    if ((newPos.x == this.position.x) && (newPos.y == this.position.y)) {
        this.randomGenerate();
    }
    // ------------------ check generate food not on the snakes------------------------
    for (var i = 0; i < numberOfSnakes; i++) {
        snakeBodyLength = this.game.snake[i].snakeBody.length;
        for (var j = 0; j < snakeBodyLength; j++) {
            if ((newPos.x == this.game.snake[i].snakeBody[j].x) && (newPos.y == this.game.snake[i].snakeBody[j].y)) {
                this.randomGenerate();
            }
        }
    }

    this.update(newPos);
    this.position.x = newPos.x;
    this.position.y = newPos.y;
};