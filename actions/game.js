import { editData } from '../auth/firebase.js';
import { state, STATE_RUNNING, STATE_LOSING, GROW_SCALE  } from '../states/actionState.js'
import { data } from '../states/dataUser.js';
import { stopAudio } from './audio.js';

import detectCollision from './detectCollision.js';
import { draw } from './draw.js';
import randomXY from './randomXY.js'

const score = document.getElementById('scoreSnake')

export default function tick() {


    const head = state.snake[0];
    const dx = state.direction.x;
    const dy = state.direction.y;
    const highestIndex = state.snake.length - 1;
    let tail = {};
    let interval = state.tick;
  

  
    Object.assign(tail,
      state.snake[state.snake.length - 1]);
  
    let didScore = (
      head.x === state.prey.x
      && head.y === state.prey.y
    );
  
    if (state.runState === STATE_RUNNING) {
        
      for (let idx = highestIndex; idx > -1; idx--) {
        const sq = state.snake[idx];
  
        if (idx === 0) {
          sq.x += dx;
          sq.y += dy;
        } else {
          sq.x = state.snake[idx - 1].x;
          sq.y = state.snake[idx - 1].y;
        }
      }
    } else if (state.runState === STATE_LOSING) {
      interval = 10;
  
      
      if (state.snake.length > 0) {
        state.snake.splice(0, 1);
      }
  
  
      // if (state.snake.length === 0) {
       
      
      // }
    }
  
    if (detectCollision()) {
      state.runState = STATE_LOSING;
      state.growing = 0;
      stopAudio()
      audio.currentTime = 0
      let scoreTosave =  parseInt(score.innerHTML)
      if(data.topScore < scoreTosave) {
        console.log("object")
        editData(data.userId, scoreTosave, data.attempts)
      } 
      
    }
  
    if (didScore) {
      state.growing += GROW_SCALE;
      state.prey = randomXY();
      score.innerHTML = state.snake.length
      state.tick = interval-0.3
    }
  
    if (state.growing > 0) {
      state.snake.push(tail);
      state.growing -= 1;
    }
  
    requestAnimationFrame(draw);
  
    setTimeout(tick, interval);
  }