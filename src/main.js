import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

let page = 1;
let searchQuery = '';
const perPage = 15;

const loadMore = document.querySelector('.js-load-more');
loadMore.addEventListener('click', onLoadMore);

hideLoader();
hideLoadMoreButton();

const searchForm = document.querySelector('.form');
searchForm.addEventListener('submit', handlerSearch);


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

    hideLoadMoreButton()

    clearGallery();

    showLoader();

    try {
        
        const data = await getImagesByQuery(searchQuery, page);

        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
            return;
        }

        createGallery(data.hits);

        const totalPages = Math.ceil(data.totalHits / perPage)

        if (page >= totalPages) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
            hideLoadMoreButton();
        } else {
            showLoadMoreButton();
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
    hideLoadMoreButton(); 

    try {
        const data = await getImagesByQuery(searchQuery, page);
        createGallery(data.hits);

        
        const galleryItem = document.querySelector('.gallery-item');
        if (galleryItem) {
            const rect = galleryItem.getBoundingClientRect();
            const cardHeight = rect.height;

            window.scrollBy({
                top: cardHeight * 2, 
                behavior: 'smooth'
            });
        }

        
        const totalPages = Math.ceil(data.totalHits / perPage);
        
        
        if (page >= totalPages) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
            hideLoadMoreButton();
            return; 
        }
        
        showLoadMoreButton();

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