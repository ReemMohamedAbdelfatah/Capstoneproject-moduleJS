url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DoParOktO7RAA0Mhxygs/comments'

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

async function open() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
    const json = await response.json();
    console.log(json);

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

    const id = json.name;
    loadComments(div, id);

    commentForm(div, id);

    const close = createElements('button', section);
    close.innerText = 'X';
    close.addEventListener('click', () => {
      close();
    });
  }