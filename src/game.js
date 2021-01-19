import Tile from './tiles';

class Game {
  constructor(size) {
    const tilesWin = [];
    this.tilesWin = tilesWin;
    this.length = size * size;

    this.bindMethods();
  }

  getWinnerTiles() {
    for (let i = 0; i < this.length - 1; i++) {
      this.tilesWin[i] = i + 1;
    }
    // this.tilesWin[this.length - 1] = '';
  }

  bindMethods() {
    this.container = document.createElement('DIV');
    this.getWinnerTiles = this.getWinnerTiles.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.moveToEmpty = this.moveToEmpty.bind(this);
    this.checkTheEndOfGame = this.checkTheEndOfGame.bind(this);
  }

  init() {
    const gameContainer = document.querySelector('.game-begin');
    const startGame = document.createElement('BUTTON');
    startGame.innerHTML = 'Start new Game';
    startGame.classList.add('start-game');

    this.container.classList.add('container');
    gameContainer.append(startGame, this.container);
    // const saveGame = JSON.parse(localStorage.getItem('tiles'));
    // console.log(saveGame);
    // if (saveGame == ' ') {
    // } else {
    //   // this.tiles = saveGame;
    //   // this.renderTiles(this.tiles);
    // }

    // this.tiles.length = 0;
    this.getWinnerTiles();
    this.tiles = [...this.tilesWin];
    // console.log(this.tilesWin);
    // console.log(this.tiles);
    this.renderTiles();
    startGame.addEventListener('click', this.beginGame);
  }

  beginGame() {
    this.getWinnerTiles();
    this.tiles = [...this.tilesWin];
    console.log(this.tilesWin);
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

    if ((this.tiles[tileToMove - 1] === '') && (tileToMove % 4 !== 0)) {
      const bingo = this.tiles[tileToMove - 1];
      this.tiles[tileToMove - 1] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }
    if ((this.tiles[tileToMove + 1] === '') && ((tileToMove + 1) % 4 !== 0)) {
      const bingo = this.tiles[tileToMove + 1];
      this.tiles[tileToMove + 1] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }
    if (this.tiles[tileToMove - 4] === '') {
      const bingo = this.tiles[tileToMove - 4];
      this.tiles[tileToMove - 4] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }
    if (this.tiles[tileToMove + 4] === '') {
      const bingo = this.tiles[tileToMove + 4];
      this.tiles[tileToMove + 4] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }

    this.checkTheEndOfGame();
    this.renderTiles(this.tiles);
  }

  checkTheEndOfGame() {
    const tilesEmptyRemove = [...this.tiles];
    tilesEmptyRemove.splice(this.tiles.length - 1, 1);
    if (this.tiles.length !== this.length) return;
    if (JSON.stringify(tilesEmptyRemove) === JSON.stringify(this.tilesWin)) {
      alert('You Win!');
    }
  }
}

export default Game;
