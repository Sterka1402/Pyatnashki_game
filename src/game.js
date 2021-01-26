import Tile from './tiles';

class Game {
  constructor() {
    this.tilesWin = [];
    this.size = 4;
    this.gameWon = false;
    this.countMove = 0;

    this.bindMethods();
  }

  bindMethods() {
    this.checkSaveGame = this.checkSaveGame.bind(this);
    this.createButtons = this.createButtons.bind(this);
    this.getSizeGame = this.getSizeGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.getWinnerTiles = this.getWinnerTiles.bind(this);
    this.restoreSaveGame = this.restoreSaveGame.bind(this)
    this.beginGame = this.beginGame.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
    this.moveToEmpty = this.moveToEmpty.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.checkTheEndOfGame = this.checkTheEndOfGame.bind(this);
  
  }

  getWinnerTiles() {
    this.tilesWin = [];
    for (let i = 1; i < this.boardSize; i++) {
      this.tilesWin.push(i);
    }
    this.tiles = [...this.tilesWin];
  }

  createButtons() {
    this.startGameBtn = document.createElement('BUTTON');
    this.startGameBtn.innerHTML = 'Start new Game';
    this.startGameBtn.classList.add('button');

    this.selectSizeGame = document.createElement('SELECT');
    this.selectSizeGame.innerHTML = `
      <option disabled selected>Choose size </option>
      <option value = '3' > 3 x 3 </option>   
      <option value = '4' > 4 x 4 </option>
      <option value = '5' > 5 x 5 </option>  
    `;
    this.selectSizeGame.classList.add('button');

    this.saveGameBtn = document.createElement('BUTTON');
    this.saveGameBtn.innerHTML = 'Save game';
    this.saveGameBtn.classList.add('button', 'hide');

    this.restoreGameBtn = document.createElement('BUTTON');
    this.restoreGameBtn.innerHTML = 'Restore game';
    this.restoreGameBtn.classList.add('button', 'hide');
  }
  
  getSizeGame(e) {
    this.saveGameBtn.classList.add('hide');
    const { value } = e.target;
      this.size = Number(value);
      this.renderBoard();
      this.getWinnerTiles();
      this.renderTiles();
  }
  renderButtons() {

  }
  renderBoard() {
    this.gameContainer.innerHTML = '';
    console.log(this.size);
    this.boardSizeClass = `board, size${this.size}`;
    this.boardGame = document.createElement('DIV');
    this.boardGame.classList.add('board',`size${this.size}`, 'before-start');
    this.gameContainer.append(this.startGameBtn, this.selectSizeGame, this.saveGameBtn, this.restoreGameBtn, this.boardGame);
    this.selectSizeGame.addEventListener('change', this.getSizeGame);

    this.boardSize = Math.pow(this.size, 2);

    this.startGameBtn.addEventListener('click', this.beginGame);
    this.restoreGameBtn.addEventListener('click', this.restoreSaveGame);
  }

  checkSaveGame() {
    if (JSON.parse(localStorage.getItem('tiles'))) {
      this.restoreGameBtn.classList.remove('hide');  
    }

  }

  restoreSaveGame() {
    this.tiles = JSON.parse(localStorage.getItem('tiles'));
    this.size = Math.sqrt(this.tiles.length);    
    console.log(Math.sqrt(this.tiles.length));
    this.renderBoard();
    this.boardGame.classList.remove('before-start');
    this.renderTiles();
  
    // localStorage.removeItem('tiles');
  }

  init() {
    this.gameContainer = document.querySelector('.game-begin');
    this.createButtons();
   
    this.checkSaveGame();
    this.renderBoard();
    this.getWinnerTiles();
    this.renderTiles();
  }

  beginGame() {
    this.gameWon = false;
    this.countMove = 0;
    this.boardGame.classList.remove('before-start');
    this.getWinnerTiles();
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
  }

  moveToEmpty(e) {
    if ( this.gameWon === true) return;
    const tileClicked = e.target;
    if (tileClicked.classList.contains('empty')) return;
    this.restoreGameBtn.classList.add('hide');
    const tileToMove = this.tiles.findIndex((item) => item === Number(tileClicked.dataset.key));
    if ((this.tiles[tileToMove - 1] === '') && (tileToMove % this.size !== 0)) {
      const bingo = this.tiles[tileToMove - 1];
      this.tiles[tileToMove - 1] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    } else if ((this.tiles[tileToMove + 1] === '') && ((tileToMove + 1) % this.size !== 0)) {
      const bingo = this.tiles[tileToMove + 1];
      this.tiles[tileToMove + 1] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    } else if ((this.tiles[tileToMove - this.size] === '') && ((tileToMove - this.size) % this.size !== 0)){
      const bingo = this.tiles[tileToMove - this.size];
      this.tiles[tileToMove - this.size] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    } else if (this.tiles[tileToMove + this.size] === '') {
      const bingo = this.tiles[tileToMove + +this.size];
      this.tiles[tileToMove + +this.size] = this.tiles[tileToMove];
      this.tiles[tileToMove] = bingo;
    }
      this.renderTiles(this.tiles);
      this.checkTheEndOfGame();

    this.countMove++;
    this.saveGameBtn.classList.remove('hide');
    this.saveGameBtn.addEventListener('click', this.saveGame);
  }

  saveGame() {
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
  }

  checkTheEndOfGame() {
    const tilesEmptyRemove = [...this.tiles];
    tilesEmptyRemove.pop();
    if ( this.gameWon === true) return; 
    if (this.tiles.length !== this.boardSize) return;
    if (JSON.stringify(tilesEmptyRemove) === JSON.stringify(this.tilesWin)) {
      this.gameWon = true;
      this.boardGame.classList.add('before-start');
      setTimeout(() => alert(`You Win! Your moves: ${this.countMove}`), 0);
    }
  }
}

export default Game;
