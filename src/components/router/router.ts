export default class Router {
  private url: URL;

  public page: number;

  public genre: string | null = null;

  public search: string | null = null;

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
    if (this.url.searchParams.has('search')) {
      this.search = this.url.searchParams.get('search');
    }
  }

  public setPage(value: number): void {
    this.page = value;
    this.url.searchParams.delete('page');
    if (value > 1) this.url.searchParams.set('page', String(value));
    history.pushState({ page: this.url.search }, '', this.url.search);
  }

  public setGenre(value: string): void {
    this.genre = value;
    this.url.searchParams.delete('genre');
    this.url.searchParams.set('genre', value);
    history.pushState({ genre: this.url.search }, '', this.url.search);
  }

  public setSearch(value: string): void {
    this.url.searchParams.delete('genre');
    this.url.searchParams.delete('page');
    this.url.searchParams.delete('search');
    this.url.searchParams.set('search', value);
    history.pushState({ search: this.url.search }, '', this.url.search);
  }

  public clear(): void {
    this.url.searchParams.delete('genre');
    this.url.searchParams.delete('page');
    this.url.searchParams.delete('search');
    history.pushState({}, '', this.url);
  }
}
