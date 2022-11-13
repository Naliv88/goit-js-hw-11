import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { createMarkup } from './scripts/markup';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const formRef = document.querySelector(".search-form");
const inputRef = document.querySelector(".search-input");
const btnRef = document.querySelector(".search-btn");
const galleryRef = document.querySelector(".gallery");

const KEY = "31288013-ac62dc6ecdfb8f972f302b190";
// ?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40

let pageCounter = 1

formRef.addEventListener('submit', getUser);

async function getUser(event) {
    event.preventDefault();
    console.log(inputRef.value);
    const search = inputRef.value.trim().toLowerCase();
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&q=${search}&image_type=photo`);
      const html =response.data.hits.map(photo => createMarkup(photo)).join("");
      galleryRef.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

// user_id:31288013
// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo


