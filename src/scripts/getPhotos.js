
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY = "31288013-ac62dc6ecdfb8f972f302b190";

export async function getPhotos(search, pageCounter) {
    console.log(search);
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&q=${search}&page=${pageCounter}`);
    if (!response.data.total) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
      if (pageCounter===1){ 
          Notify.success(`Hooray! We found ${response.data.totalHits} images!`);
      }
      pageCounter +=1;
      console.log(response);
    return response.data
  } catch (error) {
    Notify.failure('Something went wrong! Please retry');
    console.log(error);
  }
}