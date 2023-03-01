import PlayerView from './player-view';
import State from '../../utils/state';

export default class Player {
  private audio: HTMLAudioElement;

  private isPlay = false;

  public view: PlayerView;

  private ready = true;

  private firstLoad = false;

  constructor() {
    this.view = new PlayerView();
    this.audio = new Audio();
    this.audio.volume = 0.5;
    this.listeners();
  }

  public async add(data: SongData): Promise<void> {
    this.ready = false;
    if (this.isPlay) {
      this.stop();
      this.view.setPlayStop();
    }

    this.view.player.dataset.id = `${data.id}`;

    const state = new State();
    if (state.getAuth()) {
      this.view.setPlsIcon(this.checkSongInPls(data.id));
    }

    await this.setAudio(data);
  }

  private setAudio(data: SongData): Promise<Event | string> {
    return new Promise((resolve, reject) => {
      this.audio.src = data.file;

      this.audio.oncanplay = () => {
        if (this.firstLoad) {
          if (!this.isPlay) this.view.setPlayStop();
          this.play();
        } else {
          this.firstLoad = true;
        }
      };

      this.audio.onloadedmetadata = () => {
        const audioStrings: PlayerViewData = {
          artist: data.artist,
          title: data.title,
          duration: this.audio.duration,
          logo: data.logo,
        };

        this.view.setData(audioStrings);
      };
      this.audio.onload = (ev: Event) => {
        this.ready = true;

        const audioStrings: PlayerViewData = {
          artist: data.artist,
          title: data.title,
          duration: this.audio.duration,
          logo: data.logo,
        };
        this.view.setData(audioStrings);
        resolve(ev);
      };
      this.audio.onerror = (err: Event | string) => {
        this.ready = true;
        console.log(`Can\'t load track: ${err}`);
        reject(err);
      };
      this.audio.onended = () => {
        this.stop();
        this.isPlay = false;
        const range = this.view.player.querySelector('.top__range-duration') as HTMLInputElement;
        range.value = '0';
        this.view.setPlayStop();
      };
    });
  }

  public async play(): Promise<void> {
    if (!this.isPlay) {
      this.isPlay = true;
      await this.audio.play();
      this.view.animateArtist();
    }
  }

  public stop(): void {
    if (this.isPlay) {
      this.isPlay = false;
      this.audio.pause();
      this.view.animateArtist();
    }
  }

  private listeners(): void {
    const playBtn: HTMLButtonElement = this.view.player.querySelector('.top__play-stop') as HTMLButtonElement;

    playBtn.addEventListener('click', this.playListener.bind(this));

    this.audio.addEventListener('timeupdate', this.timerListener.bind(this));

    if (this.view.timeControl) {
      this.view.timeControl.addEventListener('input', this.currentTimeListener.bind(this));
    }

    const volume: HTMLInputElement = this.view.player.querySelector('.top__volume') as HTMLInputElement;
    volume.addEventListener('input', this.volumeListener.bind(this));

    this.view.addPlaylist.addEventListener('click', (ev: Event) => {
      ev.stopPropagation();
      const idSong = this.view.player.dataset.id;
      if (this.checkSongInPls(Number(idSong))) {
        this.view.setPlsIcon(false);
      } else {
        this.view.setPlsIcon(true);
      }
      document.dispatchEvent(new CustomEvent('changeSongPL', { detail: { id: Number(idSong) } }));
    });
  }

  private async playListener(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this.isPlay) {
      this.stop();
      this.view.setPlayStop();
    } else {
      await this.play();
      this.view.setPlayStop();
    }
  }

  private async timerListener(ev: Event): Promise<void> {
    ev.stopPropagation();
    this.view.updateCurrTime(this.audio.currentTime);
  }

  private async currentTimeListener(ev: Event): Promise<void> {
    ev.stopPropagation();
    const target: HTMLInputElement = ev.target as HTMLInputElement;
    const current = Number(target.value);

    this.audio.currentTime = current;
    this.view.updateCurrTime(current);
  }

  private async volumeListener(ev: Event): Promise<void> {
    ev.stopPropagation();
    const target: HTMLInputElement = ev.target as HTMLInputElement;
    this.audio.volume = Number(target.value) / 100;
  }

  private checkSongInPls(id: number): boolean | null {
    const data: string | undefined = sessionStorage.getItem('pls');
    if (!data) {
      return null;
    }
    const pls: PlsData = JSON.parse(data);
    if (pls.songsID) return pls.songsID.includes(id);
    return false;
  }
}
