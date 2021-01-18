import Game from './game';

window.addEventListener('load', () => {
  
  const size = 4
  const game = new Game (size);
  game.init(size);
    
});
