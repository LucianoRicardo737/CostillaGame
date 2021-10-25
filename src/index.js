import { state, DIRECTIONS_MAP, STATE_RUNNING } from './states/actionState.js'
import startGame from './actions/startGame.js'
import pauseGameAndReturnGame from './actions/pauseGameAndReturnGame.js'
import { audioActtions } from './actions/audio.js'
import tick from './actions/game.js'


const aboutText = document.getElementById('aboutText')
const aboutButton = document.getElementById('aboutbutton')

document.getElementById('startButton').addEventListener('click', () => {
  startGame()
})
document.getElementById('pauseButton').addEventListener('click', () => {
  pauseGameAndReturnGame()
})

aboutButton.addEventListener('click', () => {
  if (aboutButton.innerHTML === 'About') {
    aboutButton.innerHTML = 'Cerrar'
    aboutText.innerHTML = `
    <p>
    Te movés con "WASD". pausas con la "P", inicias o reinicias con la "R" y podes pausar la musica con la "M", pero al volver a iniciar el juego vuelve a empezar ya que esta buenísima. 
    </p>
    <br>
    <br>
    <p>
    Si sos una gallina, podes jugar sin registrarte y tus intentos no contaran, pero si eres un peronista de verdad y quieres que tu puntuación cuente, ingresa con tu cuenta de google y queda entre los 20 mejores para que todos vean que tu eres el mejor.
    </p>
    <br>
    <p>Comete esta costilla esta desarrollado por Luciano Emanuel Ricardo, y esta basado en el tutorial de <a href='https://gamikun.github.io/aylaculebra/snake.html'>Gamaliel Espinoza Macedo.
    <a></p>
    `
  } else {
    aboutButton.innerHTML = 'About'
    aboutText.innerHTML = ``
  }



})

let keyPressed = []

let keyPressedSpeedLimit = false

window.onload = function () {
  state.canvas = document.querySelector('canvas');
  state.context = state.canvas.getContext('2d');


  window.onkeydown = function (e) {


    if(keyPressedSpeedLimit){
      return null
    }
    keyPressedSpeedLimit = true 
    setTimeout(() => {
      keyPressedSpeedLimit = false
    }, 50)



    if (e.key === 'P' || e.key === 'p') {
      return pauseGameAndReturnGame()
    }
    if (e.key === 'R' || e.key === 'r') {
      return startGame()
    }
    if (e.key === 'M' || e.key === 'm') {
      return audioActtions()
    }


    if(state.runState!== STATE_RUNNING){
      return null
    }



    const lastKeyPressed = keyPressed[keyPressed.length - 1]
    const actualKeyPressed = e.key

    if (keyPressed.length > 5) {
      keyPressed.shift(0, 3)
    }

    if (actualKeyPressed === "A" || actualKeyPressed === "a") {
      if (lastKeyPressed === "D" || lastKeyPressed === "d") {
        return null
      }
    }


    if (lastKeyPressed === "D" || lastKeyPressed === "d") {
      if (actualKeyPressed === "A" || actualKeyPressed === "a") {
        return null
      }
    }

    if (lastKeyPressed === "W" || lastKeyPressed === "w") {
      if (actualKeyPressed === "S" || actualKeyPressed === "s") {
        return null
      }
    }

    if (lastKeyPressed === "S" || lastKeyPressed === "s") {
      if (actualKeyPressed === "W" || actualKeyPressed === "w") {
        return null
      }
    }

    keyPressed.push(e.key)

    const direction = DIRECTIONS_MAP[e.key];
    if (direction) {
      const [x, y] = direction;
      if (-x !== state.direction.x
        && -y !== state.direction.y) {
        state.direction.x = x;
        state.direction.y = y;
      }
    }
  }
  tick();
};