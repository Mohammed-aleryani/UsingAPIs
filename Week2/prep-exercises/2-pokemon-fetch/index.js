'use strict';


const VALID_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
const INVALID_URL = 'https://pokeapi.co/api/v2/pokemons/?limit=5';

async function fetchJSON(url) {

  try {

    let respons= await fetch(url);
    let jsonRes=await respons.json();
    renderResults(jsonRes)
    
  } catch (error) {
    renderError(error)
  }
}

function renderResults(pokemons) {
  // 1. Clear the text content of the HTML element with id `error`.
  const errorElement = document.querySelector('#error');
  errorElement.innerText = '';

  const pokemonsElement = document.querySelector('#json');
  pokemonsElement.innerText = JSON.stringify(pokemons, null, 2);
}

function renderError(err) {
  const pokemonsElement = document.querySelector('#json');
  pokemonsElement.innerText = '';


  const errorElement = document.querySelector('#error');
  errorElement.innerText = err;
}

function main() {
  const button = document.querySelector('#button');
  button.addEventListener('click', () => {
    const option = document.querySelector('#option');
    const url = option.checked ? INVALID_URL : VALID_URL;

    fetchJSON(url)
  });
}

window.addEventListener('load', main);