import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const ACCES_KEY = '30569231-ce5a01de05ade21426f5534e5';
const PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

export class PixabayAPI {
  #page = 1;
  #query = '';
  #totalPages = 0;
  #perPage = 40;
  async getPhotos() {
    const url = `?key=${ACCES_KEY}&q=${this.#query}&${PARAMS}&per_page=${
      this.#perPage
    }&page=${this.#page}`;
    const response = await axios.get(url);
    return response.data;
  }
  set query(newQuery) {
    this.#query = newQuery;
  }

  get query() {
    return this.#query;
  }

  incrementPage() {
    this.#page += 1;
  }
  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
