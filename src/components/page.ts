import '../assets/svg/git.svg';
import '../assets/png/rss.png';
import Base from './base/base';
import Player from './player/player';
import SongsBlock from './songs-block/songs-block';
import GenresBlock from './genres-block/genres-block';
import LeftMenu from './left-menu/left-menu';
import State from '../utils/state';
import StaticMain from './static-main/static-main';
import SearchElem from './search/search';
import Login from './login/login';
import Logo from './logo/logo';
import LangquageSwitcher from './lang-button/lang-button';
import { nSongInPage } from '../utils/heap';

export default class Page {
  private body: HTMLElement;

  private state: State;

  private logo: Logo;

  private search: SearchElem;

  private langSwitch: LangquageSwitcher;

  private login: Login;

  private player: Player;

  private songsBlockPopular: SongsBlock | undefined;

  private songsBlockRecently: SongsBlock | undefined;

  private genresBlock: GenresBlock | undefined;

  private leftMenu: LeftMenu | undefined;

  public songs: Array<SongData> = [];

  public genres: Array<GenreData> = [];

  public base: Base;

  constructor(base: Base) {
    this.base = base;
    this.body = document.body;
    this.state = new State();
    this.logo = new Logo();
    this.search = new SearchElem();
    this.langSwitch = new LangquageSwitcher();
    this.login = new Login();
    this.player = new Player();
    this.base.getSet(500, 1).then((result) => (this.songs = result.items.tracks));
  }

  public start(): void {
    this.body.append(new StaticMain().getElems());

    const leftTopSide: HTMLElement = this.body.querySelector('.top__left-menu') as HTMLElement;
    leftTopSide.append(this.logo.getLogo());

    const header: HTMLElement = this.body.querySelector('.top__header') as HTMLElement;
    header.append(this.search.getElem());
    header.append(this.langSwitch.getElems());
    header.append(this.login.getElems());

    const playerWrapper: HTMLElement = this.body.querySelector('.top__player-wrapper') as HTMLElement;
    playerWrapper.append(this.player.view.player);

    const rand = Math.round(Math.random() * 330);
    this.base.getOneSong(rand).then((result) => {
      if (result.item) this.player.add(result.item);
    });

    this.genres = [
      { key: 'pop', name: 'Popular', img: 'popular.jpg', bg1: 'rgb(175 175 39 / 71%)', bg2: 'yellow' },
      { key: 'rock', name: 'Rock', img: 'rock.jpg', bg1: '#7bb0a6', bg2: '#1dabb8' },
      { key: 'hip', name: 'Hip-hop', img: 'hip-hop.png', bg1: '#f29b34', bg2: '#ff7416' },
      { key: 'electronic', name: 'Electronic', img: 'electronic.png', bg1: '#777777', bg2: '#999999' },
      { key: 'dance', name: 'Dance', img: 'dance.png', bg1: '#2c82c9', bg2: '#83d6de' },
      { key: 'music', name: 'Lyric', img: 'lyric.jpg', bg1: '#7e3661', bg2: '#bb3658' },
      { key: 'house', name: 'House', img: 'house.png', bg1: '#a0b58d', bg2: '#8c7e51' },
    ];

    this.leftMenu = new LeftMenu(this);
    const leftSide: HTMLElement = this.body.querySelector('.top__left-menu') as HTMLElement;
    leftSide.append(this.leftMenu.leftMenu);

    this.showMain();
  }

  public playSong(id: number) {
    const curSong = this.songs.find((elem) => elem.id === id);
    if (curSong) this.player.add(curSong);
  }

  public getSongs(type: string, val: string, title: string) {
    if (type == 'genre') {
      this.base.getGenre(1, nSongInPage, val).then((result) => {
        if (result.items.tracks) this.showCollectionOfSongs(result.items.tracks, title);
      });
    }
  }

  public showCollectionOfSongs(songs: Array<SongData>, title: string) {
    const main: HTMLElement = this.body.querySelector('.top__main') as HTMLElement;
    main.innerHTML = '';
    const tmpSongs = new SongsBlock(title, songs, this);
    main.append(tmpSongs.songsBlock);
  }

  public showMain() {
    const main: HTMLElement = this.body.querySelector('.top__main') as HTMLElement;
    main.innerHTML = '';
    this.base.getSet(10, 1).then((result) => {
      const tmpSongs = new SongsBlock('Popular songs', result.items.tracks, this);
      main.append(tmpSongs.songsBlock);
      this.genresBlock = new GenresBlock('Music by genres', this.genres, this);
      if (this.genresBlock) main.append(this.genresBlock.genresBlock);
    });
    this.base.getSet(10, 2).then((result) => {
      const tmpSongs = new SongsBlock('Recently played', result.items.tracks, this);
      main.append(tmpSongs.songsBlock);
    });
  }
}
