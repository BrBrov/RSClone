import './player.scss';
import '../../assets/svg/hi.svg';
import '../../assets/svg/low.svg';
import '../../assets/svg/prev.svg';
import '../../assets/svg/play.svg';
import '../../assets/svg/stop.svg';
import '../../assets/svg/next.svg';

export default class PlayerView {
  public player: HTMLElement;

  private imgArtist: HTMLImageElement | undefined;

  private artist: HTMLSpanElement | undefined;

  private title: HTMLSpanElement | undefined;

  private current: HTMLSpanElement | undefined;

  private duration: HTMLSpanElement | undefined;

  private volume: HTMLInputElement | undefined;

  private isAnim = false;

  private animate: Animation | null;

  public timeControl: HTMLInputElement | undefined;

  constructor() {
    this.animate = null;
    this.player = this.createPlayer();
  }

  public setData(data: PlayerViewData): void {
    if (this.imgArtist) {
      this.imgArtist.src = data.logo;
    }
    if (this.artist) {
      this.artist.textContent = data.artist;
    }
    if (this.title) {
      this.title.textContent = data.title;
    }
    let seconds = data.duration % 60;
    const minutes = (data.duration - seconds) / 60;
    seconds = Math.round(seconds);
    if (this.duration) {
      this.duration.textContent = `${minutes}:${seconds}`;
    }
    if (this.current) {
      this.current.textContent = '00:00';
    }
    if (this.timeControl) {
      this.timeControl.max = `${data.duration}`;
    }
  }

  public setPlayStop(): void {
    const btnPlay: HTMLImageElement = this.player.querySelector('.top__btn-play') as HTMLImageElement;
    if (btnPlay.dataset.mode === 'play') {
      btnPlay.src = './assets/svg/stop.svg';
      btnPlay.dataset.mode = 'stop';
    } else {
      btnPlay.src = './assets/svg/play.svg';
      btnPlay.dataset.mode = 'play';
    }
  }

  public animateArtist(): void {
    if (!this.imgArtist) throw new Error('Element with artist not found!');
    if (!this.isAnim) {
      const frame = new KeyframeEffect(
        this.imgArtist,
        [
          {
            transform: 'rotate(360deg)',
          },
        ],
        { duration: 7000, iterations: 10000 }
      );

      this.animate = new Animation(frame);
      this.animate.play();
      this.isAnim = true;
    } else {
      this.animate?.finish();
      this.animate = null;
      this.isAnim = false;
    }
  }

  public updateCurrTime(current: number): void {
    if (!this.timeControl || !this.current) return;
    this.timeControl.value = `${current}`;

    if (current < 10) {
      this.current.textContent = `00:0${Math.round(current)}`;
      return;
    }

    if (current < 60) {
      this.current.textContent = `00:${Math.round(current)}`;
      return;
    }

    let seconds = current % 60;
    const minutes = (current - seconds) / 60;
    seconds = Math.round(seconds);
    const minute: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

    this.current.textContent = `${minute}:${seconds}`;
  }

  private createPlayer(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__player';

    let container: HTMLElement = document.createElement('div');
    container.className = 'top__player-image';

    this.imgArtist = document.createElement('img');
    this.imgArtist.className = 'top__image-artist';
    this.imgArtist.alt = 'Artist';
    this.imgArtist.src = '';

    container.append(this.imgArtist);
    wrapper.append(container);

    container = document.createElement('div');
    container.className = 'top__player-label';

    this.artist = document.createElement('span');
    this.artist.className = 'top__artist-title';

    container.append(this.artist);

    this.title = document.createElement('span');
    this.title.className = 'top__song-title';

    container.append(this.title);

    wrapper.append(container);

    container = document.createElement('div');
    container.className = 'top__player-controls';

    let control = document.createElement('div');
    control.className = 'top__time-control';

    this.createRangeDuration(control);

    container.append(control);

    control = document.createElement('div');
    control.className = 'top__btn-control';

    this.btnCreate(control);

    container.append(control);

    wrapper.append(container);

    container = document.createElement('div');
    container.className = 'top__volume-controls';

    this.createVolControls(container);

    wrapper.append(container);

    return wrapper;
  }

  private btnCreate(block: HTMLElement): void {
    const arrClasses = ['top__prev-play', 'top__play-stop', 'top__next-play'];
    const linksArr = ['./assets/svg/prev.svg', './assets/svg/play.svg', './assets/svg/next.svg'];
    const imgClassesArr = ['top__btn-prev', 'top__btn-play', 'top__btn-next'];
    const altArr = ['Previous', 'Play', 'Next'];

    arrClasses.forEach((classElem: string, i: number): void => {
      const btn: HTMLButtonElement = document.createElement('button');
      btn.className = classElem;
      const img: HTMLImageElement = document.createElement('img');
      img.className = imgClassesArr[i];
      img.alt = altArr[i];
      img.src = linksArr[i];
      if (altArr[i] === 'Play') {
        img.dataset.mode = 'play';
      }
      btn.append(img);
      block.append(btn);
    });
  }

  private addDurationElems(block: HTMLElement): void {
    this.current = document.createElement('span');
    this.current.className = 'top__current';
    this.current.textContent = 'start';

    block.append(this.current);

    this.duration = document.createElement('span');
    this.duration.className = 'top__duration';
    this.duration.textContent = 'stop';

    block.append(this.duration);
  }

  private createVolControls(block: HTMLElement): void {
    let img: HTMLImageElement = document.createElement('img');
    img.className = 'top__low-volume';
    img.alt = '';
    img.src = './assets/svg/low.svg';

    block.append(img);

    this.volume = document.createElement('input');
    this.volume.className = 'top__volume';
    this.volume.type = 'range';
    this.volume.max = '100';
    this.volume.min = '0';
    this.volume.value = '50';

    block.append(this.volume);

    img = document.createElement('img');
    img.className = 'top__high-volume';
    img.alt = '';
    img.src = './assets/svg/hi.svg';

    block.append(img);
  }

  private createRangeDuration(block: HTMLElement): void {
    this.timeControl = document.createElement('input');
    this.timeControl.className = 'top__range-duration';
    this.timeControl.type = 'range';
    this.timeControl.value = '0';

    block.append(this.timeControl);

    const durationWrapper: HTMLElement = document.createElement('div');
    durationWrapper.className = 'top__text-duration';

    this.addDurationElems(durationWrapper);

    block.append(durationWrapper);
  }
}
