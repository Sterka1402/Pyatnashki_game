import Tile from './tiles';

class Game {
  constructor(size) {
    const tilesWin = [];
    for (let i = 0; i < size * size - 1; i++) {
      tilesWin[i] = i + 1;
    }
    tilesWin[size * size - 1] = '';

    this.tilesWin = tilesWin;
    this.tilesWin1514 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, ''];
    this.length = size * size;

    this.container = document.createElement('DIV');
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
    this.renderTiles(this.tilesWin);
    startGame.addEventListener('click', this.beginGame);
  }

  beginGame() {
    this.tiles = [...this.tilesWin];
    this.shuffle();
    this.renderTiles(this.tiles);
  }

  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.tiles[j];
      this.tiles[j] = this.tiles[i];
      this.tiles[i] = temp;
    }
    return this.tiles;
  }

  renderTiles(arr) {
    this.container.innerHTML = '';
    arr.forEach((tile) => {
      const tileCard = new Tile(tile);
      tileCard.render(this.container);
    });

    this.container.addEventListener('click', this.moveToEmpty);
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
  }

  moveToEmpty(e) {
    const moveKey = e.target.closest('DIV');

    const tileToMove = this.tiles.findIndex((item) => item === Number(moveKey.dataset.key));

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

    // try {
    //   await localStorage.setItem('tiles', JSON.stringify(this.tiles));
    //   await this.renderTiles(this.tiles);
    //   await this.checkTheEndOfGame();
    // } catch (err) {
    //   console.log(new Error('Sorry for inconvenience. Something went wrong'));
    // }
    this.renderTiles(this.tiles);
    this.checkTheEndOfGame();
  }

  checkTheEndOfGame() {
    if ((JSON.stringify(this.tiles) === JSON.stringify(this.tilesWin))
        || (JSON.stringify(this.tiles) === JSON.stringify(this.tilesWin1514))) {
      return alert('You Win!');
    }
  }
}

export default Game;
