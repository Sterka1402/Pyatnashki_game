import Tile from './tiles';

class Game {
  constructor(size) {
    const tilesWin =  [];
    for (let i = 0; i < size * size - 1; i++) {
      tilesWin[i] = i + 1;     
    }; 
    tilesWin[size*size - 1] = '';
  

    this.tilesWin = tilesWin;
       

    this.container = document.createElement('DIV');
    this.renderTiles = this.renderTiles.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }
  init() {
    
    const gameContainer = document.querySelector('.game-begin');
    const startGame = document.createElement('BUTTON');
    startGame.innerHTML = 'Start new Game';
    startGame.classList.add('start-game');
    
    this.container.classList.add('container');
    gameContainer.append(startGame, this.container);
    this.renderTiles(this.tilesWin);
    startGame.addEventListener('click', this.beginGame);


  }
  beginGame() {
    this.tiles = [...this.tilesWin]
    this.shuffle(this.tiles);
    this.renderTiles(this.tiles);
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  renderTiles (arr) {
    this.container.innerHTML = '';
    arr.forEach((tile) => {
      const tileCard = new Tile(tile);
      tileCard.render(this.container);
           
    });

    this.container.addEventListener('click', (e) => this.moveToEmpty(e));
    
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
  }

  moveToEmpty(e) {
     const moveKey = e.target.closest('DIV');
   
    const tileToMove = this.tiles.findIndex(item  => item === Number(moveKey.dataset.key));
        
    console.log(`before move ${this.tiles}`); 
    console.log(this.tiles[tileToMove]);

    if ((this.tiles[tileToMove - 1] === '') && (tileToMove % 4 !== 0)) {
       const bingo = this.tiles[tileToMove - 1];
       this.tiles[tileToMove - 1] = this.tiles[tileToMove];
       this.tiles[tileToMove] = bingo;
    };
    if ((this.tiles[tileToMove + 1] === '') && (tileToMove % 4 !== 0)) {
      const bingo = this.tiles[tileToMove + 1];
      this.tiles[tileToMove + 1] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    };
    if (this.tiles[tileToMove - 4] === '') {
      const bingo = this.tiles[tileToMove - 4];
      this.tiles[tileToMove - 4] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    };
    if (this.tiles[tileToMove + 4] === '') {
      const bingo = this.tiles[tileToMove + 4];
      this.tiles[tileToMove + 4] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }; 
    
    // this.renderTiles(this.tiles);
    console.log(`after move ${this.tiles}`);  
    // localStorage.setItem('tiles', JSON.stringify(this.tiles));
    
  }
} 

export default Game;
