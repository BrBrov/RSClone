import './search.scss';
import '../../assets/svg/search.svg';
import State from '../../utils/state';
import Page from '../page';

export default class SearchElem {
  private readonly search: HTMLElement;

  private page: Page;

  constructor(page: Page) {
    this.search = this.createSearch();
    this.page = page;
  }

  public getElem(): HTMLElement {
    return this.search;
  }

  public switchlanguage(state: State): void {
    const lang = state.getLang();
    const text = lang === 'en' ? 'Search' : 'Найти';

    const input = this.search.querySelector('.top__search') as HTMLInputElement;
    input.placeholder = text;

    const find = document.querySelector('.find__nothing') as HTMLElement;
    if (find !== null) find.innerHTML = lang === 'en' ? 'Nothing found' : 'Ничего не найдено';
    const find1 = document.querySelector('.top_title_block') as HTMLElement;
    if (find1 !== null)
      if (lang === 'en') find1.innerHTML.replace('Search results', 'Результаты поиска');
      else find1.innerHTML.replace('Результаты поиска', 'Search results');
  }

  private createSearch(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__search-wrapper';

    const imgWrap: HTMLElement = document.createElement('div');
    imgWrap.className = 'top__icon-wrapper';

    const img: HTMLImageElement = document.createElement('img');
    img.className = 'top__search-icon';
    img.alt = 'Search';
    img.src = './assets/svg/search.svg';

    imgWrap.append(img);
    wrapper.append(imgWrap);

    const input: HTMLInputElement = document.createElement('input');
    input.className = 'top__search';
    input.type = 'text';

    const state = new State();
    if (state.getLang() === 'en') {
      input.placeholder = 'Search';
    } else {
      input.placeholder = 'Найти';
    }

    input.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' && input.value.length > 2) {
        this.page.getSongs('search', input.value, '', 1);
        this.page.router.setSearch(input.value);
      }
    });
    wrapper.append(input);
    return wrapper;
  }
}
