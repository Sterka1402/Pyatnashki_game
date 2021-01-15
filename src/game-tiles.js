import Tile from './tiles';

class Game {
  constructor(tiles) {
    this.tiles = tiles;

   
  }
  renderTiles (container) {
    
    if (!container) return;
    container.innerHTML = '';
    // console.log(this.tiles);
    this.tiles.forEach((tile) => {
      const tileCard = new Tile(tile);
      tileCard.render(container);
      // console.log(tileCard);
      
      // () => this.moveToEmpty()
    });
    
    
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
  }

  // move(e) {
  //   this.tiles.forEach((tile) => {
  //     console.log(tile)
  //   // tile.addEventListener('click', () => console.log('i'));
  //   });
  // }

  moveToEmpty() {
    console.log(this);
    // const tiles = JSON.parse(localStorage.getItem('tiles'));
    const tileToMove = this.tiles.findIndex(item => item == this.name);
    console.log(this.getBoundingClientRect());
    
    console.log(`before move ${this.tiles}`); 
    
    if (tiles[tileToMove - 1] === '') {
       const bingo = tiles[tileToMove - 1];
       tiles[tileToMove - 1] = tiles[tileToMove];
       tiles[tileToMove] = bingo;
    };
    if (tiles[tileToMove + 1] === '') {
      const bingo = tiles[tileToMove + 1];
      tiles[tileToMove + 1] = tiles[tileToMove];
      tiles[tileToMove] = bingo;
    };
    if (tiles[tileToMove - 4] === '') {
      const bingo = tiles[tileToMove - 4];
      tiles[tileToMove - 4] = tiles[tileToMove];
      tiles[tileToMove] = bingo;
    };
    if (tiles[tileToMove + 4] === '') {
      const bingo = tiles[tileToMove + 4];
      tiles[tileToMove + 4] = tiles[tileToMove];
      tiles[tileToMove] = bingo;
    }; 
    
    renderTiles()
    console.log(`after move ${this.tiles}`);  
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
    // this.render(container);
    // console.log(tiles);
  }
} 

export default Game;
