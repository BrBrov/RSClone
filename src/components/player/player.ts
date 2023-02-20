import PlayerView from './player-view';

export default class Player {
  private audio: HTMLAudioElement;

  private isPlay = false;

  public view: PlayerView;

  private mode = false;

  constructor() {
    this.view = new PlayerView();
    this.audio = new Audio();
    this.audio.volume = 0.5;
    this.listeners();
  }

  public async add(data: SongData): Promise<void> {
    if (this.isPlay) {
      this.stop();
      this.view.setPlayStop();
    }

    this.view.player.dataset.id = `${data.id}`;

    this.view.setPlsIcon(this.checkSongInPls(data.id));

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

  public setMode(): void {
    this.mode = !this.mode;
    this.view.btnState(this.mode);
    const id = Number(this.view.player.dataset.id);
    this.view.setPlsIcon(this.checkSongInPls(id));
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

    this.view.player.addEventListener('changemode', this.setMode);
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
