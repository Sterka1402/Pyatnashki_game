import Tiles from '../modules/tiles-class';
// import tiles from '../modules/tiles-data';

const renderTiles = (tiles, container) => {
  console.log(tiles);
  if (!container) return;
  container.innerHTML = '';
  tiles.forEach((tile) => {
    
    const tileCard = new Tiles(tile);
    tileCard.render(container);

  });
};

export default renderTiles;