// import renderTiles from './render-tiles';

import Game from "./game-tiles";

class Tile {
  constructor(name) {
    this.name = name;

    //  this.moveToEmpty = this.moveToEmpty.bind(this);
  }

  render(container) {
    const tileCard = document.createElement('div');
    tileCard.innerHTML = `
    <p>${this.name}</p>
    `;
    tileCard.classList.add('tiles');

    if (this.name === '') {
      tileCard.classList.add('empty');
    }
    // tileCard.addEventListener('click', () => game.moveToEmpty);  
    container.append(tileCard);
    // console.log(tileCard);
  }

  // moveToEmpty(e) {
  //   // console.log(e.target); 
  //   const tiles = JSON.parse(localStorage.getItem('tiles'));
  //   const tileToMove = tiles.findIndex(item => item == this.name);
  //    console.log(e.target.getBoundingClientRect());
    
  //   console.log(`before move ${tiles}`); 
   
  //   if (tiles[tileToMove - 1] === '') {
  //      const bingo = tiles[tileToMove - 1];
  //      tiles[tileToMove - 1] = tiles[tileToMove];
  //      tiles[tileToMove] = bingo;
  //   };
  //   if (tiles[tileToMove + 1] === '') {
  //     const bingo = tiles[tileToMove + 1];
  //     tiles[tileToMove + 1] = tiles[tileToMove];
  //     tiles[tileToMove] = bingo;
  //   };
  //   if (tiles[tileToMove - 4] === '') {
  //     const bingo = tiles[tileToMove - 4];
  //     tiles[tileToMove - 4] = tiles[tileToMove];
  //     tiles[tileToMove] = bingo;
  //   };
  //   if (tiles[tileToMove + 4] === '') {
  //     const bingo = tiles[tileToMove + 4];
  //     tiles[tileToMove + 4] = tiles[tileToMove];
  //     tiles[tileToMove] = bingo;
  //   }; 
  //   const container = document.querySelector('.container');  
  //   renderTiles(tiles, container)
  //   console.log(`after move ${tiles}`);  
  //   localStorage.setItem('tiles', JSON.stringify(tiles));
  //   // this.render(container);
  //   console.log(tiles);
  // }
}

export default Tile;
