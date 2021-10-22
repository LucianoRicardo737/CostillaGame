import { state, DIRECTIONS_MAP } from './states/actionState.js'
import startGame from './actions/startGame.js'
import pauseGameAndReturnGame from './actions/pauseGameAndReturnGame.js'
import { audioActtions } from './actions/audio.js'
import tick from './actions/game.js'








document.getElementById('startButton').addEventListener('click', ()=>{
    startGame()
})
document.getElementById('pauseButton').addEventListener('click', ()=>{
    pauseGameAndReturnGame()
})

window.onload = function() {
  state.canvas = document.querySelector('canvas');
  state.context = state.canvas.getContext('2d');

  window.onkeydown = function(e) {
    const direction = DIRECTIONS_MAP[e.key];
    if (direction) {
      const [x, y] = direction;
      if (-x !== state.direction.x
        && -y !== state.direction.y)
      {
        state.direction.x = x;
        state.direction.y = y;
      }
    }
   
    if(e.key=== 'P' || e.key=== 'p'){
        pauseGameAndReturnGame()
    }
    if(e.key=== 'R' || e.key=== 'r'){
        startGame()
    }
    if(e.key=== 'M' || e.key=== 'm'){
        audioActtions()
    }
   
  }
  tick();
};