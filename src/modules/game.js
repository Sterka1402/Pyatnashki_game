import renderTiles from './render-tiles';
import tiles from './tiles-data';
import moveTile from './move-tile';

window.addEventListener('load', () => {
  const gameContainer = document.querySelector('.box');
  const btn = document.querySelector('.start-game');

  btn.addEventListener('click', () => renderTiles(tiles, gameContainer));

  gameContainer.addEventListener('click', (e) => moveTile(e, gameContainer));
});
