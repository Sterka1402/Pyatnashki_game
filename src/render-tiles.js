import Tile from './tiles';


const renderTiles = (tiles,container) => {
  if (!container) return;
  container.innerHTML = '';
  
  tiles.forEach((tile) => {
    const tileCard = new Tile(tile);
    tileCard.render(container);
  });
  localStorage.setItem('tiles', JSON.stringify(tiles));
};

export default renderTiles;
