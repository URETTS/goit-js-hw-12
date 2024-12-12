console.log('main.js loaded');

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-container');
const input = document.querySelector('#search-input');
const gallery = document.createElement('div');
gallery.classList.add('gallery');
document.body.append(gallery);

form.addEventListener('click', async (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search term!' });
        return;
    }

    clearGallery();
    showLoader();

    try {
        const data = await fetchImages(query);

        if (data.hits.length === 0) {
            iziToast.info({ title: 'Info', message: 'Sorry, there are no images matching your search query. Please try again!' });
        } else {
            renderGallery(data.hits);
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later!' });
    } finally {
        hideLoader();
    }
});

function showLoader() {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.textContent = 'Loading...';
    document.body.append(loader);
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
}


