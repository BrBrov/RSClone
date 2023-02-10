import './card.scss';
import Page from '../page';

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
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__card';
    wrapper.id = `song${data.id}`;
    const page = this.page;
    wrapper.addEventListener('click', () => page.playSong(data.id));

    let container: HTMLElement = document.createElement('div');
    container.className = 'top__song-wrapper';

    const img: HTMLImageElement = document.createElement('img');
    img.className = 'top__song-img';
    img.alt = data.title;
    img.src = data.logo;

    container.append(img);
    wrapper.append(container);

    container = document.createElement('div');
    container.className = 'top__label-wrapper';

    let title: HTMLElement = document.createElement('span');
    title.className = 'top__song-artist';
    title.innerHTML = data.artist;

    container.append(title);

    title = document.createElement('span');
    title.className = 'top__song-title';
    title.innerHTML = data.title;

    container.append(title);

    wrapper.append(container);

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
      duration: 500,
      fill: 'forwards',
    });

    const animate = new Animation(frames);
    animate.play();
  }

  private onBlur(ev: Event): void {
    ev.stopPropagation();
    const label: HTMLElement = this.card.querySelector('.top__label-wrapper') as HTMLElement;

    const frames = new KeyframeEffect(label, [{ transform: 'translateY(140px)' }], {
      duration: 500,
      fill: 'forwards',
    });

    const animate = new Animation(frames);
    animate.play();
  }
}
