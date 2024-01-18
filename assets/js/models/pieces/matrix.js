class Matrix {

  constructor() {

    this.rows = Math.ceil(CANVAS_GAME_HEIGHT / BLOCK_WIDTH);
    this.columns = Math.ceil(CANVAS_GAME_WIDTH / BLOCK_HEIGHT);
    this.matriz = [];
  }

  // Crea la matriz
  createMatrix(rows, columns) {
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const column = [];
        row.push(column);
      }  
      this.matriz.push(row);
    }
  }

  // Compruebo la posición x e y de la pieza que me pasan
  // 38 filas
  // 22 columnas
  //PREGUNTARLE A CRIS COMO PASARLE UN OBJETO A ESTA FUNCIÓN
  checkPosition(x, y) {
    // Busco la posición donde voy a guardar el block en el array
    // La x es row y la y es column
    const position_x = Math.ceil(x / BLOCK_WIDTH);
    const position_y = Math.ceil(y / BLOCK_HEIGHT);

    this.matriz[position_x][position_y].push();

  }

}