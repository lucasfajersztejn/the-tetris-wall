class bGroup {
  constructor(ctx) {
    this.ctx = ctx;
    
    this.blocks = [new Block(this.ctx, BLOCK_X_START, BLOCK_Y_START)];
  }  

  draw() {
    this.blocks.forEach(b => b.draw());
  }

  move() {
    this.blocks.forEach(b => b.move())
  }

  onKeyEvent(event) {
    this.blocks.forEach(b => b.onKeyEvent(event))
  }

  // checkColitions() {
  //   const lastBlockIndex = this.blocks.length - 1;
  //   const lastBlock = this.blocks[lastBlockIndex];
  //   const actual_x = lastBlock.x;
  //   const actual_y = lastBlock.y;

  //   this.blocks.forEach((b, index) => {
  //     if (index !== lastBlockIndex && b.x === actual_x && b.y === actual_y) {
  //       lastBlock.x += lastBlock.w;
  //       lastBlock.y -= lastBlock.h;
  //     }
  //   });
  // }
}

