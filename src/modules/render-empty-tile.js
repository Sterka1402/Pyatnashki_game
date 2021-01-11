const emptyTile = (container) => {
  
  const emptyCard = document.createElement('div');
  emptyCard.innerHTML = '';
  emptyCard.className = 'empty-tile';
  container.append(emptyCard);

};

export default emptyTile;