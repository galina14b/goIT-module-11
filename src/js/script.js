import getData from "./fetchImages";

const input = document.querySelector('input[name="searchQuery"]');
const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryBLock = document.querySelector('.gallery')
let page = 0;

form.addEventListener('submit', galleryCreation);
loadMoreBtn.addEventListener('click', downloadGalleryMore);

function galleryCreation(e) {
  page = 1;
  e.preventDefault();
  loadMoreBtn.classList.add('hidden')
  galleryBLock.textContent = '';
  let userQuery = input.value;
  getData(userQuery, page);
  e.target.reset()
}

function downloadGalleryMore() {
  let userQuery = input.value;
  page += 1;
  getData(userQuery, page)
}