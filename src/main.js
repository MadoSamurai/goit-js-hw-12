import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

let page = 1;
let searchQuery = '';

const loadMore = document.querySelector('.ja-load-more');
loadMore.addEventListener('click', onLoadMore);

hideLoader();
const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', handlerSearch);

// ИСПРАВЛЕНО: Переписали внутренности на чистый async/await вместо .then()
async function handlerSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    searchQuery = form.elements['search-text'].value.trim();

    if (searchQuery === '') {
        iziToast.warning({
            title: 'Caution',
            message: 'Please enter a search term!',
            position: 'topRight'
        });
        return;
    }

    page = 1;
    loadMore.classList.replace("load-more", "load-more-hidden");

    clearGallery();
    showLoader();

    try {
        // Делаем асинхронный запрос через await
        const data = await getImagesByQuery(searchQuery, page);

        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
            return;
        }

        createGallery(data.hits);

        // Если картинок пришло ровно 15, значит, потенциально есть ещё страницы
        if (data.hits.length === 15) {
            loadMore.classList.replace("load-more-hidden", "load-more");
        }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topRight'
        });
    } finally {
        form.reset();
        hideLoader();
    }
}

async function onLoadMore() {
    page += 1;
    showLoader();
    
    loadMore.classList.replace("load-more", "load-more-hidden");

    try {
        const data = await getImagesByQuery(searchQuery, page);
        createGallery(data.hits);

        // Если пришло меньше 15 картинок, значит, коллекция закончилась
        if (data.hits.length < 15) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
            return; 
        }
        
        loadMore.classList.replace("load-more-hidden", "load-more");

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topRight'
        });
    } finally {
        hideLoader();
    }
}
