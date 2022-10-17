export class PixabayAPI {
  BASE_URL = 'https://pixabay.com/api/';
  ACCES_KEY = '30569231-ce5a01de05ade21426f5534e5';
  #page = 1;
  #query = '';
  #totalPages = 0;
  #perPage = 40;
  async getPhotos() {
    const url = `https://pixabay.com/api/?key=30569231-ce5a01de05ade21426f5534e5&q=${
      this.#query
    }&image_type=photo&orientation=horizontal&safesearch=true&per_page=${
      this.#perPage
    }&page=${this.#page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
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
