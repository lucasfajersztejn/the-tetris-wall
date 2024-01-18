class Game {

  constructor (canvasIdGame) {
    this.canvasGame = document.getElementById(canvasIdGame);
    this.canvasGame.width = CANVAS_GAME_WIDTH;
    this.canvasGame.height = CANVAS_GAME_HEIGHT;
    this.ctx = this.canvasGame.getContext('2d');

    this.fps = FPS;
    this.drawIntervalId = undefined;

    this.block = new Block(this.ctx, 150, -50);

  }

  onKeyEvent(event) {
    this.block.onKeyEvent(event);
  }  

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
      }, this.fps);
    }
  }

  move() {
    this.block.move();
  }

  draw() {
    this.block.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasGame.width, this.canvasGame.height);
  }

}