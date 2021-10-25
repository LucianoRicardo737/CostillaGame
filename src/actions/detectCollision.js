import { state, BOARD_WIDTH, BOARD_HEIGHT } from '../states/actionState.js'

export default function detectCollision() {
    let head = state.snake[0];
    console.log(head)
   

    if (head.x < 0
      || head.x >= BOARD_WIDTH
      || head.y >= BOARD_HEIGHT
      || head.y < 0
    ) {
      return true;
    }
    let snakeLength = state.snake.length
    for (var idx = 1; idx < snakeLength; idx++) {
  
      const sq = state.snake[idx];
  
      if (sq.x === head.x && sq.y === head.y) {
        return true;
      }
    }
    return false;
  }