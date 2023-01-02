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

// export class UnsplashAPI {
//   #BASE_URL = ' https://api.unsplash.com';
//   #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';

//   page = 1;
//   query = null;

//   fetchPhotos() {
//     return axios.get(`${this.#BASE_URL}/search/photos`, {
//       params: {
//         query: this.query,
//         page: this.page,
//         per_page: 12,
//         color: 'black_and_white',
//         client_id: this.#API_KEY,
//       },
//     });
//   }
// }
