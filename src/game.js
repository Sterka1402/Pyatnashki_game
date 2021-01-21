import Tile from './tiles';

class Game {
  constructor() {
    this.tilesWin = [];
    this.size = 4;
    this.boardSize = this.size * this.size;
    this.gameWon = false;

    this.bindMethods();
  }

  bindMethods() {
    this.init = this.init.bind(this);
    this.createButtons = this.createButtons.bind(this);
    this.getWinnerTiles = this.getWinnerTiles.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.moveToEmpty = this.moveToEmpty.bind(this);
    this.checkTheEndOfGame = this.checkTheEndOfGame.bind(this);
    this.getSizeGame = this.getSizeGame.bind(this);
  }

  getWinnerTiles() {
    for (let i = 1; i < this.boardSize; i++) {
      this.tilesWin.push(i);
    }
  }

  createButtons() {
    this.gameContainer = document.querySelector('.game-begin');
    this.startGameBtn = document.createElement('BUTTON');
    this.startGameBtn.innerHTML = 'Start new Game';
    this.startGameBtn.classList.add('start-game');

    this.selectSizeGame = document.createElement('SELECT');
    this.selectSizeGame.innerHTML = `
      <option value = '3' > 3 x 3 </option>   
      <option value = '4' selected > 4 x 4 </option>
      <option value = '5' > 5 x 5 </option>  
    `;
    this.selectSizeGame.classList.add('select-size');
  }

  getSizeGame(e) {
    // this.size = 4;
    const { value } = e.target;

    if (value === '3') {
      this.size = 3;
      // console.log(this.size);
      // return this.size
    }
    if (value === '5') {
      this.size = 5;
      // return this.size;
    }

    return this.size;
  }

  init() {
    this.createButtons();

    this.container = document.createElement('DIV');
    this.container.classList.add('container', 'before-start');
    this.gameContainer.append(this.startGameBtn, this.selectSizeGame, this.container);

    // console.log(this.size);
    this.selectSizeGame.addEventListener('change', this.getSizeGame);
    console.log(this.size);
    // this.size = (a) ? a : 4;

    this.getWinnerTiles();

    this.tiles = [...this.tilesWin];

    this.renderTiles();

    this.startGameBtn.addEventListener('click', this.beginGame);
  }

  beginGame() {
    this.container.classList.remove('before-start');
    this.tiles = [...this.tilesWin];
    this.shuffle();
    this.renderTiles();
  }

  shuffle() {
    for (let i = this.boardSize - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.tiles[j];
      this.tiles[j] = this.tiles[i];
      this.tiles[i] = temp;
    }
    this.tiles[this.boardSize - 1] = '';
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
    if (this.tiles.length !== this.boardSize) return;
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
    tilesEmptyRemove.pop();
    if (this.tiles.length !== this.boardSize) return;
    if (JSON.stringify(tilesEmptyRemove) === JSON.stringify(this.tilesWin)) {
      this.gameWon = true;
      setTimeout(() => alert('You Win!'), 5);
    }
  }
}

export default Game;
