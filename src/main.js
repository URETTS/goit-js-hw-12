import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const gallery = document.createElement('div');
gallery.classList.add('gallery');
document.body.append(gallery);

const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more');
loadMoreBtn.style.display = 'none';
document.body.append(loadMoreBtn);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search term!' });
        return;
    }

    currentQuery = query;
    currentPage = 1;
    clearGallery();
    loadMoreBtn.style.display = 'none';
    showLoader();

    try {
        const data = await fetchImages(currentQuery, currentPage);

        if (data.hits.length === 0) {
            iziToast.info({ title: 'Info', message: 'No images found. Try another search!' });
        } else {
            renderGallery(data.hits);
            if (currentPage * 15 < data.totalHits) loadMoreBtn.style.display = 'block';
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to fetch images. Try again later!' });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    showLoader(loadMoreBtn);

    try {
        const data = await fetchImages(currentQuery, currentPage);

        renderGallery(data.hits);

        if (currentPage * 15 >= data.totalHits) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
        }

        smoothScroll();
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to load more images. Try again later!' });
    } finally {
        hideLoader(loadMoreBtn);
    }
});

function showLoader(button = document.body) {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.textContent = 'Loading...';
    button.append(loader);
}

function hideLoader(button = document.body) {
    const loader = button.querySelector('.loader');
    if (loader) loader.remove();
}

function smoothScroll() {
    const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

