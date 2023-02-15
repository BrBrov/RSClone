import '../../assets/svg/disc.svg';
import '../../assets/svg/playlist.svg';
import './logo.scss';
import State from '../../utils/state';

export default class Logo {
  private logo: HTMLElement;

  constructor() {
    this.logo = this.init();
    this.checkPlsLink();
  }

  public checkPlsLink(): void {
    const state = new State();
    if (state.getAuth()) {
      this.logo.append(this.createPlsLink());
    } else {
      const pls: HTMLElement = this.logo.querySelector('.top__pls-wrapper') as HTMLElement;
      if (pls) pls.remove();
    }
  }

  public switchLang(state: State): void {
    const text = this.logo.querySelector('.top__pls-playlist') as HTMLSpanElement;
    text.textContent = state.getLang() === 'en' ? 'Playlist' : 'Плейлист';
  }

  public getLogo(): HTMLElement {
    return this.logo;
  }

  private init(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__logo-wrapper';

    const logo: HTMLElement = this.createLogo();

    wrapper.append(logo);

    return wrapper;
  }

  private createLogo(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__logo-block';

    const imgWrap: HTMLElement = document.createElement('div');
    imgWrap.className = 'top__wrapper-logo';

    const img: HTMLImageElement = document.createElement('img');
    img.className = 'top__logo';
    img.alt = 'Logo';
    img.src = './assets/svg/disc.svg';

    this.animate(img);

    imgWrap.append(img);
    wrapper.append(imgWrap);

    const text: HTMLSpanElement = document.createElement('span');
    text.className = 'top__logo-title';
    text.textContent = 'Musify';

    wrapper.append(text);

    return wrapper;
  }

  private createPlsLink(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__pls-wrapper';

    const imgWrap: HTMLElement = document.createElement('div');
    imgWrap.className = 'top__pls-icon';

    const img: HTMLImageElement = document.createElement('img');
    img.className = 'top__pls-img';
    img.alt = 'Playlist';
    img.src = './assets/svg/playlist.svg';

    imgWrap.append(img);
    wrapper.append(imgWrap);

    const text: HTMLSpanElement = document.createElement('span');
    text.className = 'top__pls-playlist';

    const state = new State();
    text.textContent = state.getLang() === 'en' ? 'Playlist' : 'Плейлист';

    wrapper.append(text);

    return wrapper;
  }

  private animate(img: HTMLImageElement): void {
    const effect = new KeyframeEffect(
      img,
      [
        {
          transform: 'rotate(360deg)',
        },
      ],
      { duration: 5000, iterations: Infinity }
    );

    const anim = new Animation(effect);
    anim.play();
  }
}
