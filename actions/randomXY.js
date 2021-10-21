import { BOARD_WIDTH, BOARD_HEIGHT  } from '../states/actionState.js'


export default function randomXY() {
    return {
      x: parseInt(Math.random() * BOARD_WIDTH),
      y: parseInt(Math.random() * BOARD_HEIGHT)
    };
  }