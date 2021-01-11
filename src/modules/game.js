import renderTiles from './render-tiles';
import tiles from './tiles-data';
import emptyTile from './render-empty-tile';
import moveTile from './move-tile';


window.addEventListener('load', () => {
  const gameContainer = document.querySelector('.box');
  
  renderTiles(tiles, gameContainer);
  emptyTile(gameContainer);

  gameContainer.addEventListener('click', (e) => moveTile(e));
});

