import './PopUp.css';

class PopUp {
  static url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DoParOktO7RAA0Mhxygs/comments'

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

    this.loadComments(body);

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

  static async loadComments(body) {
    const div = this.createElements('div', body);

    const h3 = this.createElements('h3', div);
    h3.innerText = 'Comments (2)';

    const id = 'item1';

    const comments = await this.getComments(id);

    comments.forEach((commentObj) => {
      const { creation_date: date, username, comment } = commentObj;
      const node = this.createElements('p', div);
      node.classList.add('comment');
      node.innerText = `${date}  ${username}: ${comment}`;
    });
  }

  static async getComments(id) {
    const response = await fetch(`${this.url}?item_id=${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    });

    const json = await response.json();
    return json;
  }

  static async postComments(data) {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    });

    const text = await response.text();
    return text;
  }
}

export default PopUp;