const galleryContainer = document.querySelector('.gallery');
const loaderForm = document.querySelector('.loader-form');
const loaderMore = document.querySelector('.loader-more');
const loadMoreBtn = document.querySelector('.load-more');

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </li>
  `
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader(type = 'form') {
  if (type === 'form') loaderForm.classList.remove('hidden');
  if (type === 'more') loaderMore.classList.remove('hidden');
}

export function hideLoader(type = 'form') {
  if (type === 'form') loaderForm.classList.add('hidden');
  if (type === 'more') loaderMore.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}