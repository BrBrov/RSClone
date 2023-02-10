import './card.scss';

export default class Card {
  public card: HTMLElement;

  constructor(data: SongData) {
    this.card = this.createCard(data);
    this.addListeners();
  }

  private createCard(data: SongData): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__card';

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
