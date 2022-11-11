import './css/styles.css';
import { fetchCountries } from "./scripts/fetchCountries.js"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 500;

const inputRef = document.querySelector("#search-box");
const ulRef = document.querySelector(".country-list");
const divRef = document.querySelector(".country-info");

inputRef.addEventListener("input", debounce(eventInput, DEBOUNCE_DELAY));

function eventInput(event) {

  event.preventDefault();
  clearHTML();

  if (!event.target.value == "") {
        fetchCountries(event.target.value.trim())
        .then(renderCard)
        .catch((err) => {
          Notify.failure('Oops, there is no country with that name');
        });
    };
}

function renderCard(data) {

  clearHTML();

  if (data.length === 1) {
    // divRef.innerHTML = data.map(country => divCard(country)).join('');
    divRef.innerHTML = divCard(data[0]);
  };
  
  if (data.length >= 2 && data.length < 10) {
    ulRef.innerHTML = data.map(country =>  ulListCard(country)).join('');
  };
  
  if (data.length >= 10) {
    moreTenCard();    
  };
    
}

function ulListCard({flags, name}) {
    return `
    <li class="list--item">
      <img class="list--flags" src="${flags.svg}" alt="flag ${name.official}" width="25" />
      <h2 class="">${name.official}</h2>
    </li>`;
};

function divCard({
    flags,
    name,
    capital,
    population,
    languages,
}) {
    return `
      <div class="info--container">
        <div class="info--wrapper">
          <img class="info--flags" src="${flags.svg}" alt="flag ${name.official}" width="50" />
          <h2 class="">${name.official}</h2>
        </div>
        <p class=""><span class="">Capital:</span> ${capital}</p>
        <p class=""><span class="">Population:</span> ${population}</p>
        <p class=""><span class="">Languages:</span> ${Object.values(languages)}</p>
      </div>`;
  };

function moreTenCard() {
    Notify.info("Too many matches found. Please enter a more specific name.")
};

function clearHTML() {
  ulRef.innerHTML = '';
  divRef.innerHTML = '';
}
