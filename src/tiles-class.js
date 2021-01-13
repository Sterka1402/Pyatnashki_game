import renderTiles from './render-tiles';

class Tiles {
  constructor(name) {
    this.name = name;

    // this.moveToEmpty = this.moveToEmpty.bind(this);
  }

  render(container) {
    const tileCard = document.createElement('div');
    tileCard.innerHTML = `
    <p>${this.name}</p>
    `;
    tileCard.addEventListener('click', () => this.moveToEmpty());

    tileCard.classList.add('tiles');
    container.append(tileCard);
  }

  moveToEmpty() {
    const tiles = JSON.parse(localStorage.getItem('tiles'));
    const tileToMove = tiles.findIndex(item => item == this.name);
    // console.log(tileToMove);
    console.log(`before move ${tiles}`); 
    //  for (let i = 0, i < tiles.length, i++ ) {
    if (tiles[tileToMove - 1] == '') {
       const bingo = tiles[tileToMove - 1];
       tiles[tileToMove - 1] = tiles[tileToMove];
       tiles[tileToMove] = bingo;
    };
    if (tiles[tileToMove + 1] == '') {
      const bingo = tiles[tileToMove + 1];
      tiles[tileToMove + 1] = tiles[tileToMove];
      tiles[tileToMove] = bingo;
    };
    if (tiles[tileToMove - 4] == '') {
      const bingo = tiles[tileToMove - 4];
      tiles[tileToMove - 4] = tiles[tileToMove];
      tiles[tileToMove] = bingo;
    };
    if (tiles[tileToMove + 4] == '') {
      const bingo = tiles[tileToMove + 4];
      tiles[tileToMove + 4] = tiles[tileToMove];
      tiles[tileToMove] = bingo;
    }; 
    const container = document.querySelector('.container');  
    renderTiles(tiles, container)
    console.log(`after move ${tiles}`);  
    localStorage.setItem('tiles', JSON.stringify(tiles));
    // this.render(container);
    console.log(tiles);
  }
}

export default Tiles;
