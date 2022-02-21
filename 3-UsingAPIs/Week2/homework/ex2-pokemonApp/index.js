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
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  } 
  return await response.json()
}

async function fetchAndPopulatePokemons() {
  try {
    const data = await fetchData(BASE_URL)
    const selectElement = document.createElement('select')
    data.results.forEach((result) => {
      const optionElement = document.createElement('option')
      optionElement.text = result.name;
      optionElement.value = result.url;
      selectElement.appendChild(optionElement)
    })

    document.body.appendChild(selectElement);
    selectElement.addEventListener('change', (event) => {
      fetchImage(event.target.value)
    })
  } catch (error) {
    console.log(error)
  }


}

async function fetchImage(imageUrl) {
  try {
    const data = await fetchData(imageUrl);

    if (document.querySelector('img')) {
      document.body.removeChild(document.querySelector('img'))
    }
    const imageElement = document.createElement('img');

    imageElement.src = data.sprites.front_default;
    imageElement.alt = data.alt
    document.body.appendChild(imageElement);
  } catch (error) {
    console.log(error)
  }
}

function main() {
  const buttonElement = document.createElement('button')
  buttonElement.type = 'submit';
  buttonElement.textContent = 'Get Pokemons';
  document.body.appendChild(buttonElement);
  buttonElement.addEventListener('click', () => {
    fetchAndPopulatePokemons();
    buttonElement.disabled = true;
  })
}

window.addEventListener('load', main)