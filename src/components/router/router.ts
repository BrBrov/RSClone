export default class Router {
  url: URL;

  page: number;

  genre: string | null = null;

  constructor() {
    this.url = new URL(window.location.href);
    this.page = 0;
    if (this.url.searchParams.has('page')) {
      const tmp = this.url.searchParams.get('page');
      if (typeof tmp === 'string') this.page = parseInt(tmp);
    }
    if (this.url.searchParams.has('genre')) {
      this.genre = this.url.searchParams.get('genre');
    }
  }

  setPage(value: number) {
    this.page = value;
    this.url.searchParams.delete('page');
    this.url.searchParams.set('page', String(value));
    history.pushState({ page: this.url.search }, '', this.url.search);
  }

  setGenre(value: string) {
    this.genre = value;
    this.url.searchParams.delete('genre');
    this.url.searchParams.set('genre', value);
    history.pushState({ genre: this.url.search }, '', this.url.search);
  }
}
