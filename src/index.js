import { fetchPhotos } from './js/unsplash-api';
import galleryCardTemplate from './partials/gallery-markup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const btnMoreEl = document.querySelector('.load-more');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
let simpleLightBox = new SimpleLightbox('.gallery a');

let page;

async function onSearchFormSubmit(evt) {
  evt.preventDefault();
  page = 1;
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

    galleryEl.insertAdjacentHTML('beforeend', galleryCardTemplate(data.hits));

    simpleLightBox.refresh();

    btnMoreEl.classList.remove('is-hidden');
  } catch (error) {
    console.warn(error);
  }
}

async function onLoadMoreBtn(evt) {
  evt.preventDefault();

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

    galleryEl.insertAdjacentHTML('beforeend', galleryCardTemplate(data.hits));

    simpleLightBox.refresh();
  } catch (error) {
    console.log(error);
  }
}

btnMoreEl.addEventListener('click', onLoadMoreBtn);
formEl.addEventListener('submit', onSearchFormSubmit);
