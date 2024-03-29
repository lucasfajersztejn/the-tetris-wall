class Block {

  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = BLOCK_WIDTH;
    this.h = BLOCK_HEIGHT;

    this.vx = SPEED_HORIZONTAL;
    this.vy = SPEED_FALL;
    this.y0 = this.y;

    this.movements = {
      right: false,
      left: false,
      down: false,
      heavy_fall: false,
      keyUp: false,
      keyLock: false,
      crash: false,
    }

    this.position = {
      x: this.x,
      y: this.y
    }
  }

  // Devuelve la x y la y para que la matriz pueda actualizar la posición
  position() {
    return this.position;
  }

  collidesWith(element) {
    return (
      this.x + this.w > element.x && // Mi cuadrado esta sobre el otro cuadrado
      this.x < element.x + element.w && // Mi cuadrado esta a la derecha del otro cuadrado
      this.y + this.h > element.y && // Mi cuadrado esta abajo del otro cuadrado
      this.y < element.y + element.h // Mi cuadrado esta a la izquierda del otro cuadrado
    );
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
      case KEY_HEAVY_FALL:
        this.movements.heavy_fall = enabled;
        break;
    }
  }

  move() {
    if (!this.movements.keyLock) {
      this.y += this.vy;
    
    // Si la pieza no tocó el suelo muevete a la derecha, izquierda, etc
    // Si toco el suelo dejo que se mueva 2 segundos y luego no la dejo moverse más
    // Pero si baja con la barra espaciadora ya no puede moverse.
      if (this.movements.right && this.x + 15 < (WINDOW_RIGHT - this.w)) {
        this.x += SPEED_HORIZONTAL;
      } else if (this.movements.left && this.x > (15 - this.w)) {
        this.x -= SPEED_HORIZONTAL;
      } else if (this.movements.down && this.y <= WINDOW_GROUND) {
        this.vy = this.movements.keyUp ? 1 : 5;
      } else if (this.movements.heavy_fall) {
        this.vy = SPEED_FAST;
      }
    }

    if (this.checkLimits()) {
        // Hay que restarle los 15 del cubo de abajo + 1 del espacio
        this.y = WINDOW_GROUND - this.h; // - 16;  
          
        setTimeout(() => {
          this.movements.keyLock = true;
        }, 2000);
    } 
  }

  checkLimits() {
    // Hay que sumarle los 15 del cubo de abajo +1 del espacio
    return this.y + this.h > WINDOW_GROUND; 
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    // this.ctx.fillRect(this.x + 16, this.y, this.w, this.h);
    // this.ctx.fillRect(this.x, this.y + 16, this.w, this.h);
    // this.ctx.fillRect(this.x + 16, this.y + 16, this.w, this.h);

    this.ctx.strokeStyle = "black"; // Establece el color del borde
    this.ctx.lineWidth = 2; // Establece el ancho del borde
    this.ctx.strokeRect(this.x + this.ctx.lineWidth, this.y + this.ctx.lineWidth, this.w - 2 * this.ctx.lineWidth, this.h - 2 * this.ctx.lineWidth);
  }
}

