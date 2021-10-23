import { startAudio, stopAudio } from './audio.js';
import { state, STATE_RUNNING, STATE_PAUSE, STATE_LOSING } from '../states/actionState.js'
import tick from './game.js'

export default function pauseGameAndReturnGame(){
    if(state.runState === STATE_LOSING){
        return null
    }
    if(state.runState=== STATE_PAUSE){
        state.runState = STATE_RUNNING;
        state.tick = state.prevTick
        state.prevTick = 0
        tick()
        startAudio()
    } else {
        state.runState = STATE_PAUSE;
        state.prevTick = state.tick
        state.tick = 10000000000
        stopAudio()
    }
}
