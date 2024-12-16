console.log('main.js loaded');

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-container');
const input = document.querySelector('#search-input');
const gallery = document.createElement('div');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more');
loadMoreBtn.style.display = 'none';
document.body.append(gallery, loadMoreBtn);

gallery.classList.add('gallery');

let query = '';
let page = 1;

form.addEventListener('click', async (e) => {
    e.preventDefault();
    query = input.value.trim();

    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search term!' });
        return;
    }

    page = 1;
    clearGallery();
    loadMoreBtn.style.display = 'none';
    showLoader();

    try {
        const data = await fetchImages(query, page);

        if (data.hits.length === 0) {
            iziToast.info({ title: 'Info', message: 'No images found. Try a different query!' });
        } else {
            renderGallery(data.hits);
            loadMoreBtn.style.display = 'block';
            if (page * 9 >= 36) {
                loadMoreBtn.style.display = 'none';
                iziToast.info({ title: 'Info', message: "You've reached the end of search results." });
            }
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again!' });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();

    try {
        const data = await fetchImages(query, page);

        renderGallery(data.hits);
        
        if (page * 9 >= 36) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ title: 'Info', message: "You've reached the end of search results." });
        }

        smoothScroll();
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again!' });
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

function smoothScroll() {
    const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}