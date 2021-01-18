class Tile {
  constructor(name) {
    this.name = name;
  }

  render(container) {
    const tileCard = document.createElement('div');
    tileCard.innerHTML = `
    <p>${this.name}</p>
    `;
    tileCard.classList.add('tiles');
    tileCard.setAttribute('data-key',`${this.name}`);
    

    if (this.name === '') {
      tileCard.classList.add('empty');
    }
    container.append(tileCard);
  }
}

export default Tile;
