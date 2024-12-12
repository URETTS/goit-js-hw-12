import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a class="gallery-item" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p><b>Likes:</b> ${likes}</p>
                <p><b>Views:</b> ${views}</p>
                <p><b>Comments:</b> ${comments}</p>
                <p><b>Downloads:</b> ${downloads}</p>
            </div>
        </a>
    `).join('');
    
    gallery.insertAdjacentHTML('beforeend', markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery-item', { captionsData: 'alt', captionDelay: 250 });
    } else {
        lightbox.refresh();
    }
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}
