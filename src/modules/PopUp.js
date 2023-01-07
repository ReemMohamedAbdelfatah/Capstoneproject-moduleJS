import './PopUp.css';
import fetchPokemon from '../index.js';

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
  static async open(json) {
    this.hideAll();
    const body = document.querySelector('#container');

    const section = this.createElements('section', body);
    section.classList.add('pop-up');

    const div = this.createElements('div', section);
    div.classList.add('pop-pokemon');
    const [img, name, properties] = this.createElements(['img', 'h3', 'div'], div);

    img.src = json.sprites.other['official-artwork'].front_default;
    name.innerText = json.name;
    properties.classList.add('properties');

    const [weight, height, abilities, moves] = this.createElements(['p', 'p', 'p', 'p'], properties);
    weight.innerText = `Weight: ${json.weight}`;
    weight.classList.add('prop');
    height.innerHTML = `Height: ${json.height}`;
    height.classList.add('prop');
    abilities.innerHTML = `Main ability: ${json.abilities[0].ability.name}`;
    abilities.classList.add('prop');
    moves.innerHTML = `Kill move: ${json.moves[0].move.name}`;
    moves.classList.add('prop');

    const id = json.name;
    this.loadComments(div, id);

    this.commentForm(div, id);

    const close = this.createElements('button', section);
    close.innerText = 'X';
    close.addEventListener('click', () => {
      this.close();
    });
  }

  static hideAll(show = false) {
    const cards = document.querySelectorAll('.card');
    if (show) {
      cards.forEach((card) => { card.style.display = 'block'; });
    } else {
      cards.forEach((card) => { card.style.display = 'none'; });
    }
  }

  static close() {
    const popUp = document.querySelector('.pop-up');
    if (popUp) {
      while (popUp.firstChild) {
        popUp.removeChild(popUp.firstChild);
      }

      document.querySelector('#container').removeChild(popUp);
    }

    fetchPokemon();
  }

  static async loadComments(section, id) {
    const div = this.createElements('div', section);
    div.classList.add('comments');

    const h3 = this.createElements('h3', div);
    h3.classList.add('comments-heading');
    h3.innerText = 'Comments';

    await this.appendComments(div, id);
  }

  static changeHeading(count) {
    const node = document.querySelector('.comments-heading');
    node.innerHTML = `Comments (${count})`;
  }

  static countComments(div) {
    const comments = div.querySelectorAll('.comment');

    let count = 0;
    comments.forEach(() => {
      count += 1;
    });

    return count;
  }

  static async appendComments(div, id, loading = false) {
    const comments = await this.getComments(id);
    if (!comments) return;

    if (loading) {
      div.removeChild(div.querySelector('.loader'));
    }

    comments.forEach((commentObj) => {
      const { creation_date: date, username, comment } = commentObj;
      const node = this.createElements('p', div);
      node.classList.add('comment');
      node.innerText = `${date}  ${username}: ${comment}`;
    });

    const count = this.countComments(div);
    this.changeHeading(count);
  }

  static commentForm(section, id) {
    const h4 = this.createElements('h4', section);
    h4.innerText = 'Add a comment';
    const form = this.createElements('form', section);
    form.classList.add('form');

    const inputs = this.createElements(['input', 'input', 'input'], form);
    for (let i = 0; i < 3; i += 1) {
      const input = inputs[i];

      if (i === 2) {
        input.type = 'button';
        input.value = 'Comment';
        input.classList.add('submit');

        input.addEventListener('click', async () => {
          const nameValue = document.querySelector('#name').value;
          const commentValue = document.querySelector('#comment').value;

          const data = {
            item_id: id,
            username: nameValue,
            comment: commentValue,
          };

          if (data.username && data.comment) {
            const comments = document.querySelector('.comments');
            while (comments.querySelector('.comment')) {
              comments.removeChild(comments.querySelector('.comment'));
            }

            const loader = this.createElements('div', comments);
            loader.classList.add('loader');

            await this.postComments(data);

            await this.appendComments(comments, id, true);
          }

          document.querySelector('#name').value = null;
          document.querySelector('#comment').value = null;
        });
      } else {
        input.type = 'text';
        const [placeholder, apiId] = !i ? ['Your name', 'name'] : ['Your insights', 'comment'];
        input.placeholder = placeholder;
        input.setAttribute('id', apiId);
      }
    }
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