import { state, STATE_PAUSE, STATE_RUNNING  } from '../states/actionState.js'
import { data } from '../states/dataUser.js';
import { startAudio } from './audio.js';
import tick from './game.js';
import randomXY from './randomXY.js';
import { editData, actualiceUserData } from '../auth/firebase.js';


const score = document.getElementById('scoreSnake')



export default function startGame(){
    if(state.runState===STATE_PAUSE){
        return null
    }
    if(state.runState === STATE_RUNNING){
        return null
    } else {
        state.runState = STATE_RUNNING;
        state.snake.push(randomXY());
        state.prey = randomXY();
        score.innerHTML = state.snake.length - 1
        tick()
        startAudio()
        let attempts = data.attempts + 1
        editData(data.userId, data.topScore, attempts)
        actualiceUserData(data.userId)
    }
}