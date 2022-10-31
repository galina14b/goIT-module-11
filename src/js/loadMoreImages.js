
export default async function loadMoreImages(userQuery) {
  await axios.get(`${options.BASE_URL}?key=${options.KEY}&q=${userQuery}&page=${options.page}&per_page=${options.perPage}&image_type="photo"&orientation="horizontal"&safesearch="true"
  &fields=webformatURL,largeImageURL,tags,likes,views,comments,downloads`)
  .then(function (response) {
    // handle success
    if (!response.data.total) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
      loadMoreBtn.classList.remove('hidden');
      loadMoreBtn.addEventListener('click', loadMoreImages(userQuery))
      const imageEl = template(response.data.hits);
      createGalleryItem(imageEl);
      options.page += 1;
      console.log(options.page)
    }
  })
  .catch(function (error) {
    // handle error
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

  })
}