import { fetchPhotos } from './js/unsplash-api';
import galleryCardTemplate from './partials/gallery-markup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const btnSearchEl = document.querySelector('.btn-search');
const btnMoreEl = document.querySelector('.load-more');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');

let page = 1;

const lightbox = new SimpleLightbox('.gallery a', {
  scrollZoomFactor: 0.1,
});

async function onSearchFormSubmit(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';

  const query = inputEl.value.trim();
  try {
    const { data } = await fetchPhotos(query, 1, 40);

    if (data.totalHits === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notiflix.Notify.success('Hooray! We found' + ` ${data.total} ` + 'images.');

    console.log(data);

    galleryEl.insertAdjacentHTML('beforeend', galleryCardTemplate(data.hits));
    btnMoreEl.classList.remove('is-hidden');
  } catch (error) {
    console.warn(error);
  }
}

async function onLoadMoreBtn(evt) {
  evt.preventDefault();
  lightbox.refresh();
  page += 1;
  let items = 40;
  const query = inputEl.value.trim();

  try {
    const { data } = await fetchPhotos(query, page, items);

    if (data.hits.length === 0) {
      btnMoreEl.classList.add('is-hidden');
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    console.log(data);
    galleryEl.insertAdjacentHTML('beforeend', galleryCardTemplate(data.hits));
  } catch (error) {
    console.log(error);
  }
}

btnMoreEl.addEventListener('click', onLoadMoreBtn);
formEl.addEventListener('submit', onSearchFormSubmit);
