import Tile from './tiles';

class Game {
  constructor(size) {
    this.tilesWin = [];
    this.size = size;
    this.length = size * size;
    this.gameWon = false;

    this.bindMethods();
  }

  bindMethods() {
    this.init = this.init.bind(this);
    this.getWinnerTiles = this.getWinnerTiles.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.moveToEmpty = this.moveToEmpty.bind(this);
    this.checkTheEndOfGame = this.checkTheEndOfGame.bind(this);
  }

  getWinnerTiles() {
    for (let i = 1; i < this.length; i++) {
      this.tilesWin.push(i);
    }
  }

  init() {
    const gameContainer = document.querySelector('.game-begin');
    const startGameBtn = document.createElement('BUTTON');
    startGameBtn.innerHTML = 'Start new Game';
    startGameBtn.classList.add('start-game');

    this.container = document.createElement('DIV');
    this.container.classList.add('container');
    gameContainer.append(startGameBtn, this.container);
    // const saveGame = JSON.parse(localStorage.getItem('tiles'));
    // 
    // if (saveGame == ' ') {
    // } else {
    //   // this.tiles = saveGame;
    //   // this.renderTiles(this.tiles);
    // }

    // this.tiles.length = 0;
    console.log(this.tilesWin);
    this.getWinnerTiles();
    this.tiles = [...this.tilesWin];
    // console.log(this.tilesWin);
    // console.log(this.tiles);
    this.renderTiles();
    startGameBtn.addEventListener('click', this.beginGame);
  }

  beginGame() {
    // this.getWinnerTiles();
    this.tiles = [...this.tilesWin];
    console.log(this.tiles);
    // console.log(this.tiles);
    this.shuffle();
    this.renderTiles();
  }

  shuffle() {
    for (let i = this.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.tiles[j];
      this.tiles[j] = this.tiles[i];
      this.tiles[i] = temp;
    }
    this.tiles[this.length - 1] = '';
    // console.log(this.tiles);
    return this.tiles;
  }

  renderTiles() {
    this.container.innerHTML = '';
    this.tiles.forEach((tile) => {
      const tileCard = new Tile(tile);
      tileCard.render(this.container);
    });

    this.container.addEventListener('click', this.moveToEmpty);
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
  }

  moveToEmpty(e) {
    
    if (this.tiles.length !== this.length) return;
    const tileClicked = e.target;
    if (tileClicked.classList.contains('empty')) return;
    const tileToMove = this.tiles.findIndex((item) => item === Number(tileClicked.dataset.key));

    if ((this.tiles[tileToMove - 1] === '') && (tileToMove % this.size !== 0)) {
      const bingo = this.tiles[tileToMove - 1];
      this.tiles[tileToMove - 1] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }
    if ((this.tiles[tileToMove + 1] === '') && ((tileToMove + 1) % this.size !== 0)) {
      const bingo = this.tiles[tileToMove + 1];
      this.tiles[tileToMove + 1] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }
    if (this.tiles[tileToMove - this.size] === '') {
      const bingo = this.tiles[tileToMove - this.size];
      this.tiles[tileToMove - this.size] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }
    if (this.tiles[tileToMove + this.size] === '') {
      const bingo = this.tiles[tileToMove + this.size];
      this.tiles[tileToMove + this.size] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }
   
    this.renderTiles(this.tiles);
    this.checkTheEndOfGame();
  }

  checkTheEndOfGame() {
    const tilesEmptyRemove = [...this.tiles];
    tilesEmptyRemove.splice(this.tiles.length - 1, 1);
    if (this.tiles.length !== this.length) return;
    if (JSON.stringify(tilesEmptyRemove) === JSON.stringify(this.tilesWin)) {
      this.gameWon = true;
       alert('You Win!');
    }
  }
}

export default Game;
