import { state, DIRECTIONS_MAP } from './states/actionState.js'
import startGame from './actions/startGame.js'
import pauseGameAndReturnGame from './actions/pauseGameAndReturnGame.js'
import { audioActtions } from './actions/audio.js'
import tick from './actions/game.js'


const aboutText = document.getElementById('aboutText')
const aboutButton = document.getElementById('aboutbutton')

document.getElementById('startButton').addEventListener('click', ()=>{
    startGame()
})
document.getElementById('pauseButton').addEventListener('click', ()=>{
    pauseGameAndReturnGame()
})

aboutButton.addEventListener('click', ()=>{
  if(aboutButton.innerHTML === 'About'){
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