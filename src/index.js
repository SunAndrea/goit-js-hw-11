import { fetchPhotos } from './js/unsplash-api';
import galleryCardTemplate from './partials/gallery-markup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const btnSearchEl = document.querySelector('.btn-search');
const btnMoreEl = document.querySelector('.load-more');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery div a', {
  captionsData: `alt`,
  scrollZoomFactor: 0.1,
  captionDelay: 250,
});

async function onSearchFormSubmit(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';

  const query = inputEl.value.trim();
  try {
    const { data } = await fetchPhotos(query, 1, 40);
    console.log(data);

    galleryEl.insertAdjacentHTML('beforeend', galleryCardTemplate(data.hits));
    btnMoreEl.classList.remove('is-hidden');
  } catch (error) {
    console.warn(error);
  }
}

async function onLoadMoreBtn(evt) {
  evt.preventDefault();
  let page = 1;
  let items = 40;
  const query = inputEl.value.trim();

  try {
    const { data } = await fetchPhotos(query, (page += 1), items + 40);
    if (items === data.total) {
      btnMoreEl.classList.add('is-hidden');
    }
    console.log(items);
    console.log(data.total);
    console.log(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', galleryCardTemplate(data.hits));
  } catch (error) {
    console.log(error);
  }
}

btnMoreEl.addEventListener('click', onLoadMoreBtn);
btnSearchEl.addEventListener('click', onSearchFormSubmit);
