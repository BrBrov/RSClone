import './card.scss';
import Page from '../page';
import { createByTag } from '../../utils/constants';

export default class Card {
  public card: HTMLElement;

  playSong: (a: number) => void;

  page: Page;

  constructor(data: SongData, page: Page) {
    this.page = page;
    this.card = this.createCard(data);
    this.addListeners();
    this.playSong = function (id: number) {
      return page.playSong(id);
    };
  }

  private createCard(data: SongData): HTMLElement {
    const wrapper = createByTag({ tag: 'div', class: 'top__card', id: `song${data.id}` });
    const page = this.page;
    wrapper.addEventListener('click', () => page.playSong(data.id));

    let container = createByTag({ tag: 'div', class: 'top__song-wrapper', parent: wrapper });
    const img = <HTMLImageElement>createByTag({ tag: 'img', class: 'top__song-img', parent: container });
    img.alt = data.title;
    img.src = data.logo;
    img.addEventListener('click', () => page.playSong(data.id));

    container = createByTag({ tag: 'div', class: 'top__label-wrapper', parent: wrapper });
    const titleArt = createByTag({ tag: 'span', class: 'top__song-artist', parent: container });
    titleArt.innerHTML = data.artist;

    const titleSong = createByTag({ tag: 'span', class: 'top__song-title', parent: container });
    titleSong.innerHTML = data.title;
    return wrapper;
  }

  private addListeners(): void {
    const img: HTMLImageElement = this.card.querySelector('.top__song-img') as HTMLImageElement;
    img.addEventListener('mouseover', this.onFocus.bind(this));
    img.addEventListener('mouseleave', this.onBlur.bind(this));
  }

  private onFocus(ev: Event): void {
    ev.stopPropagation();
    const label: HTMLElement = this.card.querySelector('.top__label-wrapper') as HTMLElement;

    const frames = new KeyframeEffect(label, [{ transform: 'translateY(-140px)' }], {
      duration: 1000,
      fill: 'forwards',
    });

    const animate = new Animation(frames);
    animate.play();
  }

  private onBlur(ev: Event): void {
    ev.stopPropagation();
    const label: HTMLElement = this.card.querySelector('.top__label-wrapper') as HTMLElement;

    const frames = new KeyframeEffect(label, [{ transform: 'translateY(140px)' }], {
      duration: 1000,
      fill: 'forwards',
    });

    const animate = new Animation(frames);
    animate.play();
  }
}
