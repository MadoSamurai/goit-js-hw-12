import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.ja-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `
                <li class="gallery-item">
                    <a class="gallery-link" href="${largeImageURL}">
                        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
                    </a>
                    <ul class="info-container">
                        <li class="info-item"><h3>Likes</h3> <p>${likes}</p></li>
                        <li class="info-item"><h3>Views</h3> <p>${views}</p></li>
                        <li class="info-item"><h3>Comments</h3> <p>${comments}</p></li>
                        <li class="info-item"><h3>Downloads</h3> <p>${downloads}</p></li>
                    </ul>
                </li>
                `
        ).join(" ");
 
    gallery.insertAdjacentHTML('beforeend', markup);
    
    
    lightbox.refresh();
};

export function clearGallery() {
  gallery.innerHTML = '';
};

export function showLoader() {
  loader.classList.remove('hidden');
};

export function hideLoader() {
  loader.classList.add('hidden');
};

export function showLoadMoreButton() {
    loadMore.classList.replace("load-more-hidden", "load-more");
}

export function hideLoadMoreButton() {
    loadMore.classList.replace("load-more", "load-more-hidden");
}

