const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DoParOktO7RAA0Mhxygs/likes/';

const fetchLikes = (pokemon, item) => fetch(url)
  .then((response) => response.json())
  .then((likes) => {
    likes.forEach((pokemonLike) => {
      if (pokemonLike.item_id === pokemon.name) {
        item.textContent = pokemonLike.likes;
      }
    });
  });

export default fetchLikes;
