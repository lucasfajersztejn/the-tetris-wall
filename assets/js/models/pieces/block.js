class Block {

  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 15;

    this.vx = 15;
    this.vy = 1;
    this.y0 = this.y;

    this.movements = {
      right: false,
      left: false,
      down: false,
      keyUp: false
    }
  }

  onKeyEvent(event) {
    const enabled = event.type === 'keydown';
    const keyUp = event.type === 'keyup'
    switch (event.keyCode) {
      case KEY_LEFT:
        this.movements.left = enabled;
        break;
      case KEY_RIGHT:
        this.movements.right = enabled;
        break;
      case KEY_DOWN:
        this.movements.down = enabled;
        if (keyUp) {
          this.vy = 1;
        } else {
          this.vy = 5;
        }
        break;
    }
  }

  move() {
    this.y += this.vy;

    if (this.movements.right && this.x + 31 < (WINDOW_RIGHT - this.w)) {
      console.log(this.x)
      this.x += 15;
    } else if (this.movements.left && this.x > (30 - this.w)) {
      this.x -= 15
    } else if (this.movements.down && this.y <= WINDOW_GROUND) {
      this.vy = this.movements.keyUp ? 1 : 5;
    }
    
    if (this.checkLimits()) {
      this.y = WINDOW_GROUND - this.h - 16; // Hay que restarle los 16 del cubo de abajo
    } 

  }

  checkLimits() {
    return this.y + this.h + 16 > WINDOW_GROUND; // Hay que sumarle los 16 del cubo de abajo
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.fillRect(this.x + 16, this.y, this.w, this.h);
    this.ctx.fillRect(this.x, this.y + 16, this.w, this.h);
    this.ctx.fillRect(this.x + 16, this.y + 16, this.w, this.h);
  }
}