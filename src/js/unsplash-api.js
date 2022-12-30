import axios from 'axios';
export { fetchPhotos };

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32466802-4e3ba47eee8faf0a044392b81';

async function fetchPhotos(query, page, perPage) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response;
}
