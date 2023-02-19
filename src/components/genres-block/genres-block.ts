import './genres-block.scss';
import CardGenre from '../card-genre/card-genre';
import Page from '../page';
import { createByTag } from '../../utils/constants';

export default class GenresBlock {
  public genresBlock: HTMLElement;

  private page: Page;

  constructor(title: string, data: Array<GenreData>, page: Page) {
    this.page = page;
    this.genresBlock = this.createBlock(title, data);
  }

  public switchLang(): void {
    const title = this.genresBlock.querySelector('.genre__title-block') as HTMLSpanElement;

    const text = title.textContent;

    switch (text) {
      case 'Music by genres':
        title.textContent = 'Музыка по жанрам';
        break;
      case 'Музыка по жанрам':
        title.textContent = 'Music by genres';
        break;
    }
  }

  private createBlock(title: string, data: Array<GenreData>): HTMLElement {
    const wrapper = createByTag({ tag: 'div', class: 'genre__block-wrapper' });
    const titleWrap = createByTag({ tag: 'div', class: 'genre__wrapper-title', parent: wrapper });
    const text = createByTag({ tag: 'span', class: 'genre__title-block', parent: titleWrap });
    text.textContent = title;

    const cardWrapper = createByTag({ tag: 'div', class: 'genre__cards-block', parent: wrapper });

    data.forEach((item: GenreData) => {
      const card = new CardGenre(item, this.page);
      cardWrapper.append(card.card);
    });
    return wrapper;
  }
}
