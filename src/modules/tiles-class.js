// import tiles from '../modules/tiles-data';

class Tiles {
  constructor(name) {
    this.name = name;

    // this.moveToEmpty = this.moveToEmpty.bind(this);
  }

  render(container) {
    const tileCard = document.createElement('div');
    tileCard.innerHTML = `
    <p>${this.name}</p>
    `;
    // tileCard.addEventListener('click', (e) => this.moveToEmpty(e));

    tileCard.classList.add('tiles');
    container.append(tileCard);
  }

  // moveToEmpty(e) {
  //    console.log(e.target.classList.contains('box'));
  //   if (e.target.classList.contains('tiles')) {
  //     console.log('myau');
  //   }
  // }
}

export default Tiles;
