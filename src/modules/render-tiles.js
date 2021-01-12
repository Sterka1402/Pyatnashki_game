import Tiles from '../modules/tiles-class';
 import shuffle from '../modules/shuffle';

const renderTiles = (tiles, container) => {
  if (!container) return;
  container.innerHTML = '';
  shuffle(tiles).forEach((tile) => {
    const tileCard = new Tiles(tile);
    tileCard.render(container);

  });
};

export default renderTiles;