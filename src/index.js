import Game from './game';

window.addEventListener('load', () => {
  const default_size = 4;
  const game = new Game(default_size);
  game.init();
});
