'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
const MAIN_URL = "https://pokeapi.co/api/v2/pokemon/";

const body = document.querySelector('body');

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
}

async function fetchAndPopulatePokemons() {
  const data = await fetchData(`${MAIN_URL}?offset=151&limit=151`);
  const pokemons = data.results;
  const selectElement = document.createElement("select");
  selectElement.addEventListener('change', (e) => { fetchImage(e.target.value) });
  body.appendChild(selectElement)
  pokemons.forEach((pokemon) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = pokemon.name;
    optionElement.value = pokemon.name;
    selectElement.appendChild(optionElement);
  })
}

async function fetchImage(pokemonName) {
  try {
    const imageURL = `${MAIN_URL}${pokemonName}`;
    const response = await fetch(imageURL);
    if (!response.ok) {
      throw new Error('Fetching image failed');
    }
    const data = await response.json();
    if (document.querySelector('img')) {
      document.body.removeChild(document.querySelector('img'));
    }
    const pokemonImg = document.createElement('img');
    console.log(data.sprites.front_default)
    pokemonImg.src = data.sprites.front_default;
    pokemonImg.alt = `${pokemonName}`;
    body.appendChild(pokemonImg);
  } catch (err) {
    console.log(err)
  }
}

function main() {
  const btnElement = document.createElement('button');
  btnElement.textContent = 'Get Your Pokemon';
  btnElement.type = 'submit';
  body.appendChild(btnElement);
  btnElement.onclick = () => {
    fetchAndPopulatePokemons();
    btnElement.disabled = true;
  }
}
window.addEventListener('load', main)