import './songs-block.scss';
import Card from '../card/card';
import Page from '../page';

export default class SongsBlock {
  public songsBlock: HTMLElement;

  page: Page;

  constructor(title: string, data: Array<SongData>, page: Page) {
    this.page = page;
    this.songsBlock = this.createBlock(title, data);
  }

  private createBlock(title: string, data: Array<SongData>): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__block-wrapper';

    const titleWrap: HTMLElement = document.createElement('div');
    titleWrap.className = 'top__wrapper-title';

    const text: HTMLSpanElement = document.createElement('span');
    text.className = 'top__title-block';
    text.textContent = title;

    titleWrap.append(text);
    wrapper.append(titleWrap);

    const cardWrapper: HTMLElement = document.createElement('div');
    cardWrapper.className = 'top__cards-block';

    data.sort(() => Math.random() - 0.5);
    data.forEach((item: SongData) => {
      const card = new Card(item, this.page);
      cardWrapper.append(card.card);
    });

    wrapper.append(cardWrapper);

    return wrapper;
  }
}
