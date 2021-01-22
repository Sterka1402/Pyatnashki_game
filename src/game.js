import Tile from './tiles';

class Game {
  constructor() {
    this.tilesWin = [];
    this.size = 4;
    this.gameWon = false;

    this.bindMethods();
  }

  bindMethods() {
    this.createButtons = this.createButtons.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
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
   
    this.startGameBtn = document.createElement('BUTTON');
    this.startGameBtn.innerHTML = 'Start new Game';
    this.startGameBtn.classList.add('start-game');

    this.selectSizeGame = document.createElement('SELECT');
    this.selectSizeGame.innerHTML = `
      <option disabled selected>Choose size </option>
      <option value = '3' > 3 x 3 </option>   
      <option value = '4' > 4 x 4 </option>
      <option value = '5' > 5 x 5 </option>  
    `;
    this.selectSizeGame.classList.add('select-size');
  }

  getSizeGame(e) {
    const { value } = e.target;
      this.size = Number(value);
      this.renderBoard();
  }

  renderBoard() {
    this.gameContainer.innerHTML = '';
    this.boardSizeClass = `board, size${this.size}`;
    this.boardGame = document.createElement('DIV');
    this.boardGame.classList.add('board',`size${this.size}`, 'before-start');
    this.gameContainer.append(this.startGameBtn, this.selectSizeGame, this.boardGame);
    this.selectSizeGame.addEventListener('change', this.getSizeGame);

    this.boardSize = Math.pow(this.size, 2);
    this.tilesWin = [];
    this.getWinnerTiles();
    
    this.tiles = [...this.tilesWin];

    this.renderTiles();

    this.startGameBtn.addEventListener('click', this.beginGame);

  }

  init() {
    this.gameContainer = document.querySelector('.game-begin');
    this.createButtons();
    this.renderBoard();
    
    console.log(this.size);
    
    // this.boardSize = Math.pow(this.size, 2);
    // this.tilesWin = [];
    // this.getWinnerTiles();
    // this.tiles = [...this.tilesWin];

    // this.renderTiles();

    // this.startGameBtn.addEventListener('click', this.beginGame);
  }

  beginGame() {
    this.gameWon = false;
    this.boardGame.classList.remove('before-start');
    // this.tilesWin = [];
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
    this.boardGame.innerHTML = '';
    this.tiles.forEach((tile) => {
      const tileCard = new Tile(tile);
      tileCard.render(this.boardGame);
    });

    this.boardGame.addEventListener('click', this.moveToEmpty);
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
  }

  moveToEmpty(e) {
    if ( this.gameWon === true) return;
    // if (this.tiles.length !== this.boardSize) return;
    const tileClicked = e.target;
    if (tileClicked.classList.contains('empty')) return;
    const tileToMove = this.tiles.findIndex((item) => item === Number(tileClicked.dataset.key));
    console.log(tileToMove);
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
    if (this.tiles[tileToMove - +this.size] === '') {
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
    if ( this.gameWon === true) return; 
    if (this.tiles.length !== this.boardSize) return;
    if (JSON.stringify(tilesEmptyRemove) === JSON.stringify(this.tilesWin)) {
      this.gameWon = true;
      this.boardGame.classList.add('before-start');
      setTimeout(() => alert('You Win!'), 0);
    }
  }
}

export default Game;
