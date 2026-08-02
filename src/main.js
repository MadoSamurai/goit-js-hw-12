import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
hideLoader();
const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', handlerSearch);

async function handlerSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const searchQuery = form.elements['search-text'].value.trim();

    if (searchQuery === '') {
        iziToast.warning({
            title: 'Caution',
            message: 'Please enter a search term!',
            position: 'topRight'
        });
        return;
    };

    clearGallery();

    showLoader();

    getImagesByQuery(searchQuery)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight'
                });
                return;
            }

            createGallery(data.hits);
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong. Please try again later.',
                position: 'topRight'
            });
        })
        .finally(() => {
            form.reset();
            hideLoader();
        });
}