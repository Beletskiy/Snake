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