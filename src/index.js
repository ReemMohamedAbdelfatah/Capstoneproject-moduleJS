/* eslint-disable  no-unused-vars  , no-use-before-define , no-plusplus */

import './style.css';
import fetchLikes from './modules/fetchApiLikes.js';
import postLikes from './modules/postApiLikes.js';
import likesNumber from './modules/countLikes.js';
import counter from './modules/counter.js';
import PopUp from './modules/PopUp.js';
import open from './modules/Reservations/Reservations.js';

const pokeList = document.querySelector('#pokeList');
let likes = [];
const fetchPokemon = async () => {
  const promises = [];
  for (let i = 1; i <= 18; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  likes = await fetchLikes();
  Promise.all(promises).then((results) => { displayPokemon(results); });
};

const displayPokemon = (results) => {
  results.forEach((json) => {
    let noOflikes = likesNumber(json.name, likes);

    const li = document.createElement('li');
    li.classList.add('card');
    pokeList.appendChild(li);
    const img = document.createElement('img');
    img.classList.add('card-image');
    img.src = json.sprites.front_default;
    li.appendChild(img);
    const h2 = document.createElement('h2');
    h2.classList.add('card-title');
    h2.innerText = `${json.id}. ${json.name}`;
    li.appendChild(h2);
    const buttonLike = document.createElement('button');
    buttonLike.setAttribute('id', 'like');
    const pokeLikes = document.createElement('i');
    pokeLikes.classList.add('number-likes');
    pokeLikes.innerText = `${noOflikes} likes`;
    buttonLike.appendChild(pokeLikes);

    const heart = document.createElement('i');
    heart.classList.add('fa', 'fa-heart');
    buttonLike.appendChild(heart);

    h2.appendChild(buttonLike);
    buttonLike.addEventListener('click', () => {
      postLikes(json.name);

      noOflikes += 1;
      pokeLikes.innerText = `${noOflikes} likes`;
    });

    const p = document.createElement('li');
    p.innerText = `Type: ${json.types.map((type) => type.type.name)}`;
    li.classList.add('card-subtitle');

    const buttonComment = document.createElement('button');
    buttonComment.innerHTML = 'Comment';
    buttonComment.setAttribute('id', 'commentBtn');
    li.appendChild(buttonComment);
    buttonComment.addEventListener('click', () => {
      PopUp.open(json);
    });

    const buttonReservations = document.createElement('button');
    buttonReservations.innerText = 'Reserve';
    buttonReservations.setAttribute('id', 'reservationBtn');
    li.appendChild(buttonReservations);
    buttonReservations.addEventListener('click', () => {
      open(json);
    });
  });

  const count = counter(pokeList);
  document.querySelector('#title-count').innerHTML = `Pokemons (${count})`;
};

fetchPokemon();

export default fetchPokemon;