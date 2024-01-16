class Game {

  constructor (canvasIdGame) {
    this.canvasGame = document.getElementById(canvasIdGame);
    this.canvasGame.width = CANVAS_GAME_WIDTH;
    this.canvasGame.height = CANVAS_GAME_HEIGHT;
    this.ctx = this.canvasGame.getContext('2d');

    // this.canvasPiece = document.getElementById(canvasIdPiece);
    // this.canvasPiece.width = CANVAS_PIECE_WIDTH;
    // this.canvasPiece.height = CANVAS_PIECE_HEIGHT;
    // this.ctxPiece = this.canvasPiece.getContext("2d");

    this.fps = FPS;
    this.drawIntervalId = undefined;

    //this.background = new Background(this.ctx);
    this.block = new Block(this.ctx, 384, 80);

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
    //this.background.draw();
    this.block.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasGame.width, this.canvasGame.height);
    //this.ctxPiece.clearRect(0, 0, this.canvasPiece.width, this.canvasPiece.height);
  }

}