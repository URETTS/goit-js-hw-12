import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47590180-dc1d7afa62bd02f66448b190c';

export async function fetchImages(query, page = 1, perPage = 9) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
    
    const response = await axios.get(url);
    
    if (response.status !== 200) {
        throw new Error('Failed to fetch images');
    }

    return response.data;
}