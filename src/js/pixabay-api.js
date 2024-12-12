const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47590180-dc1d7afa62bd02f66448b190c'; 

export function fetchImages(query, page = 1, perPage = 9) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
    console.log('Generated URL:', url);

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error(`HTTP Error: ${response.status}`);
                throw new Error(`Failed to fetch images: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            return data;
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            throw error;
        });
}
