class Game {

  constructor (canvasIdGame) {
    this.canvasGame = document.getElementById(canvasIdGame);
    this.canvasGame.width = CANVAS_GAME_WIDTH;
    this.canvasGame.height = CANVAS_GAME_HEIGHT;
    this.ctx = this.canvasGame.getContext('2d');

    this.fps = FPS;
    this.drawIntervalId = undefined;

    this.block = new Block(this.ctx, 150, -50);
    this.stick = new Stick(this.ctx, 100, -50);
    this.blockGroups = [new bGroup(this.ctx)];
  }

  onKeyEvent(event) {
    this.blockGroups.forEach(block => block.onKeyEvent(event));
  }  

  // Itera array de grupos comprobando si cada grupo
  // Colisiona con otro grupo.
  checkColitions() {
    const len = this.blockGroups.length - 1;

    this.blockGroups.forEach((block, index) => {
      if (index !== len && this.blockGroups[len].blocks[0].collidesWith(block.blocks[0])) {
        this.blockGroups[len].blocks[0].y = block.blocks[0].y - BLOCK_HEIGHT - 1;
        this.blockGroups[len].blocks[0].movements.crash = true;
        setTimeout(() => {
          this.blockGroups[len].blocks[0].movements.keyLock = true;
        }, 2000);
        console.log("choque")
      }
    });
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.checkMoveEnd();
        this.checkColitions();
        this.draw();
        
      }, this.fps);
    }
  }

  checkMoveEnd() {
    const key = this.blockGroups[this.blockGroups.length - 1].blocks[0].movements.keyLock;
    if (key) {
      this.blockGroups.push(new bGroup(this.ctx));
    }
  }

  move() {
    this.blockGroups.forEach(block => block.move());
  }


  draw() {
    this.blockGroups.forEach(block => block.draw());
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasGame.width, this.canvasGame.height);
  }

}