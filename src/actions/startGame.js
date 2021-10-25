import { state, STATE_LOSING, STATE_PAUSE, STATE_RUNNING  } from '../states/actionState.js'
import { data } from '../states/dataUser.js';
import { startAudio } from './audio.js';
import tick from './game.js';
import randomXY from './randomXY.js';
import { editData, actualiceUserData } from '../auth/firebase.js';


const score = document.getElementById('scoreSnake')

function startSnake() {
    return {
      x: parseInt(12),
      y: parseInt(10)
    };
  }


export default function startGame(){
    if(state.runState === STATE_LOSING){
        state.runState = STATE_RUNNING;
        state.snake.push(startSnake());
        state.prey = randomXY();
        score.innerHTML = state.snake.length - 1
        state.tick = 80
        tick()
        startAudio()
        let attempts = data.attempts + 1
        data.userId && editData(data.userId, data.topScore, attempts)
        data.userId && actualiceUserData(data.email)
    } else {
        return null
    }
}