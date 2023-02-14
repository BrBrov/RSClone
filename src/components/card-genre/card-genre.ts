import './card-genre.scss';
import Page from '../page';
import { createByTag } from '../../utils/heap';

export default class CardGenre {
  public card: HTMLElement;

  page: Page;

  constructor(data: GenreData, page: Page) {
    this.page = page;
    this.card = this.createCard(data);
  }

  private createCard(data: GenreData): HTMLElement {
    const wrapper = createByTag({ tag: 'div', class: 'genre__card', id: `genre-${data.key}` });
    wrapper.style.background = data.bg1;
    wrapper.addEventListener('mouseover', () => {
      wrapper.style.background = data.bg2;
    });
    wrapper.addEventListener('mouseout', () => {
      wrapper.style.background = data.bg1;
    });
    wrapper.addEventListener('click', () => {
      this.page.getSongs('genre', data.key, data.name, 1);
    });

    const container = createByTag({ tag: 'div', class: 'genre__card-wrapper', parent: wrapper });
    const img = <HTMLImageElement>createByTag({ tag: 'img', class: 'genre__card-img', parent: container });
    img.alt = data.name;
    img.src = `./assets/img/${data.img}`;

    const title = createByTag({ tag: 'div', class: 'genre__card__title', parent: wrapper });
    title.innerHTML = data.name;
    return wrapper;
  }
}
