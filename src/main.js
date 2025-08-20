import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const loadMoreBtn = document.querySelector('.load-more');

  let query = '';
  let page = 1;
  let totalHits = 0;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    query = e.currentTarget.elements['search-text'].value.trim();
    if (!query) return;

    page = 1;
    clearGallery();
    hideLoadMoreButton();

    await fetchImages();
  });

  loadMoreBtn.addEventListener('click', async () => {
    hideLoadMoreButton();
    showLoader();
    await fetchImages();
  });

  async function fetchImages() {
    try {
      showLoader();

      const data = await getImagesByQuery(query, page);

      if (!data.hits || data.hits.length === 0) {
        alert("We're sorry, but you've reached the end of search results.");
        return;
      }

      createGallery(data.hits);
      totalHits = data.totalHits;

      page += 1;

      if (page * 15 <= totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        if (page === 2) {
          alert("We're sorry, but you've reached the end of search results.");
        }
      }

      smoothScroll();
    } catch (error) {
      console.error(error);
      hideLoadMoreButton();
    } finally {
      hideLoader();
    }
  }

  function smoothScroll() {
    const firstCard = document.querySelector('.gallery li');
    if (!firstCard) return;
    const { height: cardHeight } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
});
