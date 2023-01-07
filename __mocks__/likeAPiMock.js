function displayPokemon(results, pokeList) {
  results.forEach((json) => {
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
    pokeLikes.innerText = 'likes';
    buttonLike.appendChild(pokeLikes);

    const heart = document.createElement('i');
    heart.classList.add('fa', 'fa-heart');
    buttonLike.appendChild(heart);

    h2.appendChild(buttonLike);

    const p = document.createElement('li');
    p.innerText = `Type: ${json.types.map((type) => type.type.name)}`;
    li.classList.add('card-subtitle');

    const buttonComment = document.createElement('button');
    buttonComment.innerHTML = 'Comment';
    buttonComment.setAttribute('id', 'commentBtn');
    li.appendChild(buttonComment);

    const buttonReservations = document.createElement('button');
    buttonReservations.innerText = 'Reserve';
    buttonReservations.setAttribute('id', 'reservationBtn');
    li.appendChild(buttonReservations);
  });
}

export default displayPokemon;