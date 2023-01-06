import './reservation.css';
import postAPI from './PostAPI.js';
import getAPI from './GetAPI.js';
import counter from './Counter.js';

const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DoParOktO7RAA0Mhxygs/reservations';

function createElements(tags, parent = null) {
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

function changeHeading(count) {
  const node = document.querySelector('.reservations-heading');
  node.innerHTML = `Reservations (${count})`;
}

async function pasteReservation(div, id, loading = false) {
  const reservations = await getAPI(id, url);
  if (!reservations) return;

  if (loading) {
    div.removeChild(div.querySelector('.loader'));
  }

  reservations.forEach((obj) => {
    const { username, date_start: startDate, date_end: endDate } = obj;
    const node = createElements('p', div);
    node.classList.add('reservation');
    node.innerText = `${startDate} - ${endDate} by ${username}`;
  });

  const count = counter(div);
  changeHeading(count);
}

async function reservations(section, id) {
  const div = createElements('div', section);
  div.classList.add('reservations');

  const h3 = createElements('h3', div);
  h3.classList.add('reservations-heading');
  h3.innerText = 'Reservations';

  await pasteReservation(div, id);
}

function card(json) {
  const body = document.querySelector('body');

  const section = createElements('section', body);
  section.classList.add('pop-up');

  const div = createElements('div', section);
  div.classList.add('pop-pokemon');
  const [img, name, properties] = createElements(['img', 'h3', 'div'], div);

  img.src = json.sprites.other['official-artwork'].front_default;
  name.innerText = json.name;
  properties.classList.add('properties');

  const [weight, height, abilities, moves] = createElements(['p', 'p', 'p', 'p'], properties);
  weight.innerText = `Weight: ${json.weight}`;
  weight.classList.add('prop');
  height.innerHTML = `Height: ${json.height}`;
  height.classList.add('prop');
  abilities.innerHTML = `Main ability: ${json.abilities[0].ability.name}`;
  abilities.classList.add('prop');
  moves.innerHTML = `Kill move: ${json.moves[0].move.name}`;
  moves.classList.add('prop');

  const close = createElements('button', section);
  close.innerText = 'X';
  close.addEventListener('click', () => {
    const popUp = document.querySelector('.pop-up');
    if (popUp) {
      while (popUp.firstChild) {
        popUp.removeChild(popUp.firstChild);
      }

      document.querySelector('body').removeChild(popUp);
    }
  });

  return div;
}

function form(section, id) {
  const h4 = createElements('h4', section);
  h4.innerText = 'Add a reservation';
  const form = createElements('form', section);
  form.classList.add('form');

  const inputs = createElements(['input', 'input', 'input', 'input'], form);
  for (let i = 0; i < 4; i += 1) {
    const input = inputs[i];

    if (i === 3) {
      input.type = 'button';
      input.value = 'Reserve';
      input.classList.add('submit');

      input.addEventListener('click', async () => {
        const nameValue = document.querySelector('#name').value;
        const startValue = document.querySelector('#start-date').value;
        const endValue = document.querySelector('#end-date').value;

        const data = {
          item_id: id,
          username: nameValue,
          date_start: startValue,
          date_end: endValue,
        };

        if (data.username && data.date_end && data.date_start) {
          const reservations = document.querySelector('.reservations');
          while (reservations.querySelector('.reservation')) {
            reservations.removeChild(reservations.querySelector('.reservation'));
          }

          const loader = createElements('div', reservations);
          loader.classList.add('loader');

          await postAPI(data, url);

          await pasteReservation(reservations, id, true);
        }

        document.querySelector('#name').value = null;
        document.querySelector('#comment').value = null;
      });
    } else {
      const inputData = (index) => (index === 1 ? ['Start date', 'start-date', 'date'] : ['End date', 'end-date', 'date']);

      const [placeholder, apiId, type] = !i ? ['Your name', 'name', 'text'] : inputData(i);
      input.placeholder = placeholder;
      input.setAttribute('id', apiId);
      input.type = type;
    }
  }
}

async function open() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
  const json = await response.json();

  const div = card(json);

  reservations(div, json.name);

  form(div, json.name);
}

export default open;