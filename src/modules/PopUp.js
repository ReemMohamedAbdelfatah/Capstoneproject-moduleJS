import './PopUp.css';

class PopUp {
  static createElements(tags, parent = null) {
    if (typeof tags === 'string') {
      const node = document.createElement(tags);
      if (parent) { parent.appendChild(node); }

      return node;
    }

    return tags.reduce((elements, tag) => {
      const node = document.createElement(tag);
      if (parent) { parent.appendChild(node); }

      elements.push(node);

      return elements;
    }, []);
  }

  // accept json arg
  static open() {
    const body = document.querySelector('body');

    const section = this.createElements('section', body);
    section.classList.add('pop-up');

    const div = this.createElements('div', section);
    div.classList.add('pop-pokemon');
    const [img, name, weight] = this.createElements(['img', 'h3', 'p'], div);

    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg';
    name.innerText = 'Pikachu';
    weight.innerText = '60 lbs';

    const close = this.createElements('button', section);
    close.innerText = 'X';
    close.addEventListener('click', () => {
      this.close();
    });
  }

  static close() {
    const popUp = document.querySelector('.pop-up');
    if (popUp) {
      while (popUp.firstChild) {
        popUp.removeChild(popUp.firstChild);
      }

      document.querySelector('body').removeChild(popUp);
    }
  }
}

export default PopUp;