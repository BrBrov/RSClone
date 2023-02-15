import './songs-block.scss';
import Card from '../card/card';
import Page from '../page';
import { createByTag } from '../../utils/heap';

export default class SongsBlock {
  public songsBlock: HTMLElement;

  page: Page;

  constructor(title: string, data: Array<SongData>, page: Page) {
    this.page = page;
    this.songsBlock = this.createBlock(title, data);
  }

  private createBlock(title: string, data: Array<SongData>): HTMLElement {
    const wrapper = createByTag({ tag: 'div', class: 'top__block-wrapper' });
    const titleWrap = createByTag({ tag: 'div', class: 'top__wrapper-title', parent: wrapper });
    const text = createByTag({ tag: 'span', class: 'top__title-block', parent: titleWrap });
    text.textContent = title;

    const cardWrapper = createByTag({ tag: 'div', class: 'top__cards-block', parent: wrapper });

    data.sort(() => Math.random() - 0.5);
    data.forEach((item: SongData) => {
      const card = new Card(item, this.page);
      cardWrapper.append(card.card);
    });
    return wrapper;
  }

  public switchLang(): void {
    const title = this.songsBlock.querySelector('.top__title-block') as HTMLSpanElement;
    const text = title.textContent;

    switch (text) {
      case 'Popular songs':
        title.textContent = 'Популярные песни';
        break;
      case 'Recently played':
        title.textContent = 'Недавно играло';
        break;
      case 'Популярные песни':
        title.textContent = 'Popular songs';
        break;
      case 'Недавно играло':
        title.textContent = 'Recently played';
        break;
    }
  }
}
