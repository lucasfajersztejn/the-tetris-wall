class Block {

  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 15;

    this.vx = 31;
    this.vy = 1;
    this.y0 = this.y;

    this.movements = {
      right: false,
      left: false,
      down: false
    }
  }

  onKeyEvent(event) {
    const enabled = event.type === 'keydown';
    const a = event.type === 'keyUp'
    switch (event.keyCode) {
      case KEY_LEFT:
        this.movements.left = enabled;
        break;
      case KEY_RIGHT:
        this.movements.right = enabled;
        break;
      case KEY_DOWN:
        this.movements.down = enabled;
        break;
    }
  }

  move() {
    this.y += this.vy;
    if (this.movements.right && this.x +16 < (549 - this.w)) {
      this.x += 15;
    } else if (this.movements.left && this.x > (234 - this.w)) {
      this.x -= 15
    } else if (this.movements.down && this.y <= WINDOW_GROUND) {
      this.vy = 5;
    }
    // if (this.checkLimits()) {
    //   this.y = WINDOW_GROUND - this.h
    // }
  }

  checkLimits() {
    return this.y + this.h > WINDOW_GROUND
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.fillRect(this.x + 16, this.y, this.w, this.h);
    this.ctx.fillRect(this.x, this.y + 16, this.w, this.h);
    this.ctx.fillRect(this.x + 16, this.y + 16, this.w, this.h);
  }
}