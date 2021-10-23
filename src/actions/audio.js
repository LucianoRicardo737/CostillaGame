

// const playAndStopAudio = document.getElementById('playOrPauseMusic')
const audio = document.getElementById('audio')
// const musicStatus = document.getElementById('musicStatus')

// playAndStopAudio.addEventListener('click', ()=>{
//     audioActtions()
// })

export function stopAudio(){
    audio.pause()
    // musicStatus.innerHTML=':Off'
}
export function startAudio(){
    audio.play()
    // musicStatus.innerHTML=':On'
}

export function audioActtions(){
    if(audio.duration > 0 && !audio.paused){
        stopAudio()
    } else {
        startAudio()
    }
}