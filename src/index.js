import { alert, notice, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import cardExampleTpl from './temtlates/cards.hbs';
import FetchCountries from './js/fetchCountries';
const debounce = require('lodash.debounce');


//  error({
//     text: 'Notice me, senpai!'
//   });

const formEl = document.querySelector('.js-search-form');
const inputEl = document.querySelector('.input__search');
const containerEl = document.querySelector('.container');


inputEl.addEventListener('input', debounce(onSearch, 2000));

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value;
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
    
    FetchCountries(url)
        .then(renderContry)
        .catch(onFetchError)
        .finally(() => {
            formEl.reset();
        });
};

function fetchCountries(url) {
    return fetch(url).
        then(responce => { return responce.json(); })
      
};

function renderContry(data) {
        if (data.length > 9) {
                alert('Too many matches found. Please enter a more specific query!');
                 return;
        }

        if (data.length > 1) {
                renderList(data);
                return;
        }
    
        renderCards(data)
};

function renderList(data) {
   containerEl.innerHTML = data.reduce((acc, el) => acc + `<li>${el.name}</li>`, '');
    };
    
function renderCards(data) {
   const markupCards = cardExampleTpl(...data);
         containerEl.innerHTML= markupCards;
};

function onFetchError(error) {
    alert('I can not find');
};