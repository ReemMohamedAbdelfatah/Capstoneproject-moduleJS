import style from './style.css'
const pokeList = document.querySelector('#pokeList');
const fetchPokemon = () => {
  const promises = [];
  for(let i = 1; i<= 150; i++)
  {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  promises.push(fetch(url).then(res =>  res.json()));
  }
  Promise.all(promises).then( results => {
    const pokemon = results.map( result => ({
      name: result.name,
      id: result.id,
      image: result.sprites['front_default'],
      type: result.types.map((type) => type.type.name)
    }));
    displayPokemon(pokemon);
  });

};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon.map( pokeman => `
  <li class="card">
     <img class="card-image" src="${pokeman.image}">
     <h2 class="card-title">${pokeman.id}. ${pokeman.name}<button id="like"><i class="number-likes"></i><i class="fa fa-heart"></i></button></h2>
     <p class="card-subtitle">Type: ${pokeman.type}</p>
     <button id="commentBtn">Comment</button>
     <button id="reservationBtn">Reserve</button>
  </li>`).join('');
  pokeList.innerHTML = pokemonHTMLString;
}

fetchPokemon();
