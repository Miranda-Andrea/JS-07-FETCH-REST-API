// Fetch
const BASE_URL = 'https://pokeapi.co/api/v2/';
const cardContainer = document.querySelector('.card--container');
const pokeNameInput = document.getElementById('poke-name');
const getBtn = document.getElementById('get-btn');
const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');

let currentPokemonIndex = 0;

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

const createPokemonCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const nameElement = document.createElement('p');
    nameElement.textContent = `Name: ${pokemon.name}`;

    const idElement = document.createElement('p');
    idElement.textContent = `ID: ${pokemon.id}`;

    const weightElement = document.createElement('p');
    weightElement.textContent = `Weight: ${pokemon.weight}`;

    const imageElement = document.createElement('img');
    imageElement.src = pokemon.sprites.front_default;
    imageElement.alt = pokemon.name;

    card.appendChild(nameElement);
    card.appendChild(idElement);
    card.appendChild(weightElement);
    card.appendChild(imageElement);

    cardContainer.appendChild(card);
}

// Obtener pokemon
getBtn.addEventListener('click', async () => {
    const text = pokeNameInput.value.toLowerCase();
    const pokemon = await fetchPokemon(text);

    // Guardar el ID actual en localStorage
    localStorage.setItem('currentPokeId', pokemon.id);

    // Limpiar el contenedor de tarjetas antes de agregar una nueva
    cardContainer.innerHTML = '';

    // Crear y agregar la tarjeta del Pokemon al DOM
    createPokemonCard(pokemon);
});

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);

    // Crear y agregar la tarjeta del Pokemon al DOM
    createPokemonCard(pokemon);
});

// Obtener el anterior
previousBtn.addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = Math.max(1, currentPokeId - 1);
    const pokemon = await fetchPokemon(newId);

    // Crear y agregar la tarjeta del Pokemon al DOM
    createPokemonCard(pokemon);

    // Actualizar el ID actual en localStorage
    localStorage.setItem('currentPokeId', pokemon.id);
});

// Obtener el siguiente
nextBtn.addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = currentPokeId + 1;
    const pokemon = await fetchPokemon(newId);

    // Crear y agregar la tarjeta del Pokemon al DOM
    createPokemonCard(pokemon);

    // Actualizar el ID actual en localStorage
    localStorage.setItem('currentPokeId', pokemon.id);
});


/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch
