import './search.scss';
import '../../assets/svg/search.svg';
import State from '../../utils/state';

export default class SearchElem {
  private readonly search: HTMLElement;

  constructor() {
    this.search = this.createSearch();
  }

  public getElem(): HTMLElement {
    return this.search;
  }

  public switchlanguage(state: State): void {
    const lang = state.getLang();
    const text = lang === 'en' ? 'Search' : 'Найти';

    const input = this.search.querySelector('.top__search') as HTMLInputElement;
    input.placeholder = text;
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

    wrapper.append(input);

    return wrapper;
  }
}
