import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './partials/PixabayAPI';
import { refs } from './partials/refs';
import { spinerPlay, spinerStop } from './partials/spiner';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { createImageMarkup } from './partials/createImageMarkup';

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', clickOnLoadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const notifyOptions = {
  position: 'right-top',
  clickToClose: true,
};

const pixabay = new PixabayAPI();

async function handleSubmit(event) {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    Notify.failure('Enter search data!!!', notifyOptions);
    return;
  }
  pixabay.query = query;
  clearAll();
  try {
    refs.loadMoreBtn.classList.add('is-hidden');
    spinerPlay();
    const data = await pixabay.getPhotos(query);
    const { hits, totalHits } = data;
    const markup = createImageMarkup(hits);
    if (hits.length > 0) {
      Notify.success(`Hooray! We found ${totalHits} images`, notifyOptions);
    }
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    pixabay.calculateTotalPages(totalHits);

    if (pixabay.isShowLoadMore) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }

    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        notifyOptions
      );
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    Notify.failure('Something wrong!!!', notifyOptions);
    clearAll();
    console.log(error);
  } finally {
    spinerStop();
  }
}

async function clickOnLoadMore() {
  refs.loadMoreBtn.classList.remove('is-hidden');
  pixabay.incrementPage();
  if (!pixabay.isShowLoadMore) {
    Notify.failure(
      `We're sorry, but you've reached the end of search results`,
      notifyOptions
    );
    refs.loadMoreBtn.classList.add('is-hidden');
  }
  try {
    spinerPlay();

    const data = await pixabay.getPhotos();
    const { hits } = data;
    const markup = createImageMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 5,
      behavior: 'smooth',
    });
  } catch (error) {
    Notify.failure('Something wrong!!!', notifyOptions);
    clearAll();
  } finally {
    spinerStop();
  }
}

function clearAll() {
  pixabay.resetPage();
  resetImageMarkup();
}

function resetImageMarkup() {
  refs.gallery.innerHTML = '';
}
