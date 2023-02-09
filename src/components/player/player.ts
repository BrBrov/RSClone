import PlayerView from './player-view';

export default class Player {
  private audio: HTMLAudioElement;

  private isPlay = false;

  // TODO: audioSource have duration and currentTime
  public view: PlayerView;

  constructor() {
    this.view = new PlayerView();
    this.audio = new Audio();
    this.audio.volume = 0.5;
    this.listeners();
  }

  public async add(data: SongData): Promise<void> {
    if (this.isPlay) {
      this.audio.pause();
    }
    await this.setAudio(data);

    const audioStrings: PlayerViewData = {
      artist: data.artist,
      title: data.title,
      duration: this.audio.duration,
      logo: data.logo,
    };
    this.view.setData(audioStrings);
    await this.play();
  }

  private setAudio(data: SongData): Promise<Event> {
    return new Promise((resolve, reject) => {
      this.audio.src = data.file;

      this.audio.onloadedmetadata = () => {
        const audioStrings: PlayerViewData = {
          artist: data.artist,
          title: data.title,
          duration: this.audio.duration,
          logo: data.logo,
        };
        this.view.setData(audioStrings);
      };
      this.audio.onload = (ev: Event) => resolve(ev);
      this.audio.onerror = (err: Event | string) => reject(err);
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
    console.dir(playBtn);
    playBtn.addEventListener('click', this.playListener.bind(this));

    this.audio.addEventListener('timeupdate', this.timerListener.bind(this));

    if (this.view.timeControl) {
      this.view.timeControl.addEventListener('input', this.currentTimeListener.bind(this));
    }

    const volume: HTMLInputElement = this.view.player.querySelector('.top__volume') as HTMLInputElement;
    volume.addEventListener('input', this.volumeListener.bind(this));
  }

  private async playListener(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this.isPlay) {
      this.stop();
    } else {
      await this.play();
    }
    this.view.setPlayStop();
  }

  private async timerListener(): Promise<void> {
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
}
