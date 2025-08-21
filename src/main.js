import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery, clearGallery,
  showLoader, hideLoader,
  showLoadMoreButton, hideLoadMoreButton
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const loadMoreBtn = document.querySelector('.load-more');

  let query = '';
  let page = 1;
  let totalHits = 0;
  const PER_PAGE = 15;

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    query = e.currentTarget.elements['search-text'].value.trim();

    if (!query) {
      iziToast.warning({ message: 'Please enter a search term' });
      return;
    }

    page = 1;
    clearGallery();
    hideLoadMoreButton();
    await fetchImages('form');
  });

  loadMoreBtn.addEventListener('click', async () => {
    hideLoadMoreButton();      
    await fetchImages('more'); 
  });

  async function fetchImages(loaderType) {
    try {
      showLoader(loaderType);

      const data = await getImagesByQuery(query, page);

      if (!data.hits || data.hits.length === 0) {
        if (page === 1) {
          iziToast.info({ message: 'No images found, try another query.' });
        } else {
          iziToast.info({ message: "You've reached the end of search results." });
        }
        return;
      }

      createGallery(data.hits);

      
      lightbox.refresh();

      totalHits = data.totalHits;

      const totalLoaded = page * PER_PAGE;
      if (totalLoaded < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({ message: "You've reached the end of search results." });
      }

      page += 1; 
      smoothScroll();
    } catch (err) {
      console.error(err);
      iziToast.error({ message: 'Something went wrong. Try again later.' });
    } finally {
      hideLoader(loaderType);
    }
  }

  function smoothScroll() {
    const firstCard = document.querySelector('.gallery li');
    if (!firstCard) return;
    const { height: cardHeight } = firstCard.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }
});