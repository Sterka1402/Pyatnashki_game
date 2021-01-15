import Game from './game-tiles';
// import tiles from './tiles-data';
import shuffle from './shuffle';

 window.addEventListener('load', () => {
  
  const tilesWin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
  // const tiles = (!JSON.parse(localStorage.getItem('tiles')) ? shuffle(tilesWin) : JSON.parse(localStorage.getItem('tiles')));
  const tiles = shuffle(tilesWin);
 
  const gameContainer = document.querySelector('.game-begin');
  const startGame = document.createElement('BUTTON');
  startGame.innerHTML = 'Start new Game';
  startGame.classList.add('start-game');
  const container = document.createElement('DIV');
  container.classList.add('container');


  gameContainer.append(startGame, container);
  const game = new Game (tiles);
  startGame.addEventListener('click',() => game.renderTiles(container));
  
  
});
