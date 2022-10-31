import axios from "axios";
import Notiflix from 'notiflix';
import template from "./../template.hbs"

const options = {
  KEY: "30987365-3fb5ba0bc2c11b9a856e6023e",
  BASE_URL: `https://pixabay.com/api/`,
  perPage: 40
}
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let totalHits = null;

export default async function getData(userQuery, page) {
  await axios.get(`${options.BASE_URL}?key=${options.KEY}&q=${userQuery}&page=${page}
  &per_page=${options.perPage}&image_type="photo"&orientation="horizontal"&safesearch="true"
  &fields=webformatURL,largeImageURL,tags,likes,views,comments,downloads`)
    .then(function (response) {
    // handle success
    if (!response.data.total) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
      if (totalHits >= response.data.totalHits) {
        loadMoreBtn.classList.add('hidden')
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        return
      }
      loadMoreBtn.classList.remove('hidden');
      const imageEl = template(response.data.hits);
      createGalleryItem(imageEl);
      totalHits = totalHits + response.data.hits.length;
    }
  })
  .catch(function (error) {
    // handle error
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

  })
}

function createGalleryItem(image) {
  galleryEl.insertAdjacentHTML('beforeend', image);
}


