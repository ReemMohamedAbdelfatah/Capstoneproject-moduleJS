/* eslint-disable max-len */
/* eslint-disable  no-unused-vars  , no-use-before-define , no-plusplus */
import style from './style.css';
import close from './images/close.jpg';

const pokeList = document.querySelector('#pokeList');
const Modal = document.querySelector('.modal-container');

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      id: result.id,
      image: result.sprites.front_default,
      type: result.types.map((type) => type.type.name),
    }));
    displayPokemon(pokemon);
  });
};

window.reservePop = (id) => {
  // const promises = [];
  // const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  // promises.push(fetch(url).then((res) => res.json()));
  // Promise.all(promises).then((results) => {
  //   const pokemon = results.map((result) => ({
  //     name: result.name,
  //     id: result.id,
  //     image: result.sprites.front_default,
  //     type: result.types.map((type) => type.type.name),
  //   }));
  // });
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()).then((data) => {
    Modal.innerHTML = `
  <div class="modalbox">
    <div class="pop-top">
      <div class="top-title">
      <img class="popup-image" src='${data.sprites.front_default}' alt="Project Popup Image">
        <img onclick="CloseModal()" class="close-modal" src="${close}" alt="closebutton">
    </div>
  </div>
  <h1 class="modaltitle">${data.name}</h1>
    <div class="below-box">
    <p class="pop-up-description"></p>
    <div class="sec-box">
      <ul class="language_used_modal"></ul>
    <div class="modal-button-div">
    </div>
    </div>
  </div>
  </div>
  `;
    Modal.style.display = 'block';
  });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon.map((pokeman) => `
  <li class="card">
     <img class="card-image" src="${pokeman.image}">
     <h2 class="card-title">${pokeman.id}. ${pokeman.name}<button id="like"><i class="number-likes"></i><i class="fa fa-heart"></i></button></h2>
     <p class="card-subtitle">Type: ${pokeman.type}</p>
     <button id="commentBtn">Comment</button>
     <button id="reservationBtn" onClick='reservePop(${pokeman.id})'>Reserve</button>
  </li>`).join('');
  pokeList.innerHTML = pokemonHTMLString;
};

fetchPokemon();
