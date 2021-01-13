const moveTile = (e, gameContainer) => {
  const tiles = JSON.parse(localStorage.getItem('tiles'));
  console.log(e.target.value);
  const changeTile = tiles.find((item) => item == e.target);
  console.log(changeTile);
  // if (e.target.classList.contains('tiles')
  //   ) {

  // }
};

export default moveTile;
