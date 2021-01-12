import Tiles from './tiles-class';
import shuffle from './shuffle';

const renderTiles = (tiles, container) => {
  if (!container) return;
  container.innerHTML = '';
  shuffle(tiles).forEach((tile) => {
    const tileCard = new Tiles(tile);
    tileCard.render(container);
  });
  localStorage.setItem('tiles', JSON.stringify(tiles));
};

export default renderTiles;
