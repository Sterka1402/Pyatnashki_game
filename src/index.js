import Game from './game';

window.addEventListener('load', () => {
  const defaultSize = 4;
  const game = new Game(defaultSize);
  game.init();
});
