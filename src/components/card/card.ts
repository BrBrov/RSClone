import './card.scss';
import Page from '../page';
import { createByTag } from '../../utils/constants';
import State from '../../utils/state';

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
    const wrapper = createByTag({ tag: 'div', class: 'top__card', id: `${data.id}` });
    const page = this.page;

    let container = createByTag({ tag: 'div', class: 'top__song-wrapper', parent: wrapper });
    const img = <HTMLImageElement>createByTag({ tag: 'img', class: 'top__song-img', parent: container });
    img.alt = data.title;
    img.src = data.logo;

    img.addEventListener('click', () => {
      page.playSong(data.id);
      page.base.addView(data.id);
    });
    const state = new State();
    if (state.getAuth()) {
      if (this.page.playListID.indexOf(data.id) >= 0) {
        const icon = createByTag({ tag: 'i', class: 'fa-heart-circle-minus', parent: wrapper });
        icon.classList.add('playlist__minus');
        icon.classList.add('fa-solid');
        icon.addEventListener('click', () =>
          document.dispatchEvent(new CustomEvent('changeSongPL', { detail: { id: data.id } }))
        );
      } else {
        const icon = createByTag({ tag: 'i', class: 'fa-heart-circle-plus', parent: wrapper });
        icon.classList.add('fa-solid');
        icon.classList.add('playlist__plus');
        icon.addEventListener('click', () =>
          document.dispatchEvent(new CustomEvent('changeSongPL', { detail: { id: data.id } }))
        );
      }
    }

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

  private checkSongInPls(id: number): boolean | null {
    const data: string | undefined = sessionStorage.getItem('pls');
    if (!data) {
      return null;
    }
    const pls: Playlist = JSON.parse(data);
    console.log(pls);
    return pls.pls.songsID.includes(id);
  }
}
