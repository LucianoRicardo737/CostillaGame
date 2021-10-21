import { state, STATE_RUNNING  } from '../states/actionState.js'
import { startAudio } from './audio.js';
import tick from './game.js';
import randomXY from './randomXY.js';

export default function startGame(){
    if(state.runState === STATE_RUNNING){
        return null
    } else {
        state.runState = STATE_RUNNING;
        state.snake.push(randomXY());
        state.prey = randomXY();
        tick()
        startAudio()
    }
}