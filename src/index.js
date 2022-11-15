import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {getPhotos} from './scripts/getPhotos'
import { createMarkup } from './scripts/markup';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formRef = document.querySelector(".search-form");
const inputRef = document.querySelector(".search-input");
const galleryRef = document.querySelector(".gallery");
const loadMoreRef = document.querySelector(".load-more");

const lightbox = new SimpleLightbox('.gallery a');

loadMoreRef.addEventListener('click', onLoadClick);
formRef.addEventListener('submit', submitClick);

let oldSearch = "";
let newSearch = "";
let pageCounter = 1;

if (oldSearch ===""||newSearch !== oldSearch){
  pageCounter = 1;
  loadMoreRef.classList.add("hidden");
};

async function submitClick(event) {
  event.preventDefault();
  newSearch = event.currentTarget.elements.searchQuery.value; 
  pageCounter = 1;
  
  console.log(newSearch);
  try {
    const response = await getPhotos(newSearch, pageCounter);
  
    const html = response.hits.map(photo => createMarkup(photo)).join("");
    galleryRef.innerHTML = html;
    lightbox.refresh();
    loadMoreRef.classList.remove("hidden");
    oldSearch = newSearch;
    
  } catch (error) {
    console.log(error);
  }
}

async function onLoadClick() {
  
  pageCounter += 1;
  const response = await getPhotos(oldSearch, pageCounter);
  console.log(response);
  const { hits, totalHits } = response;
  const markup = hits.map(photo => createMarkup(photo)).join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  const amountOfPages = totalHits / 40 - pageCounter;
  if (amountOfPages < 1) {
    loadMoreRef.classList.add('hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

// user_id:31288013
// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo


