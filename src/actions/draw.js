import { state, SQUARE_SIZE } from '../states/actionState.js'


export function drawPixel(color, x, y) {
    state.context.fillStyle = color;
    state.context.fillRect(
      x * SQUARE_SIZE,
      y * SQUARE_SIZE,
      SQUARE_SIZE,
      SQUARE_SIZE
    );
  }
  

export function draw() {
    state.context.clearRect(0, 0, 500, 500);
  
    for (var idx = 0; idx < state.snake.length; idx++) {
      const {x, y} = state.snake[idx];
      drawPixel('#22dd22', x, y);
    }
  
    const {x, y} = state.prey;
    drawPixel('yellow', x, y);
  }