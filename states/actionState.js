

export const STATE_RUNNING = 1;
export const STATE_LOSING = 2;
export const STATE_PAUSE=3;

const TICK = 80;
export const SQUARE_SIZE = 10;
export const BOARD_WIDTH = 50;
export const BOARD_HEIGHT = 50;
export const GROW_SCALE = 1;
export const DIRECTIONS_MAP = {
  'A': [-1,  0],
  'D': [ 1,  0],
  'S': [ 0,  1],
  'W': [ 0, -1],
  'a': [-1,  0],
  'd': [ 1,  0],
  's': [ 0,  1],
  'w': [ 0, -1],
  'ArrowLeft': [-1,  0],
  'ArrowRight': [ 1,  0],
  'ArrowDown': [ 0,  1],
  'ArrowUp': [ 0, -1],
};

export let state = {
    canvas: null,
    context: null,
    snake: [{x: 0, y: 0}],
    direction: {x: 1, y: 0},
    prey: {x: 0, y: 0},
    growing: 0,
    runState: STATE_LOSING,
    tick:80,
    prevTick:0
  };
  
// export function generalState(){
//     return state
// }