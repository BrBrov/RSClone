import '../assets/svg/git.svg';
import '../assets/png/rss.png';
import Base from './base/base';
import Router from './router/router';
import Player from './player/player';
import SongsBlock from './songs-block/songs-block';
import GenresBlock from './genres-block/genres-block';
import LeftMenu from './left-menu/left-menu';
import State from '../utils/state';
import StaticMain from './static-main/static-main';
import SearchElem from './search/search';
import Login from './login/login';
import Logo from './logo/logo';
import Pagination from './pagination/pagination';
import LanguageSwitcher from './lang-button/lang-button';
import { nSongInPage } from '../utils/heap';

export default class Page {
  private body: HTMLElement;

  private readonly state: State;

  private logo: Logo;

  private search: SearchElem;

  private langSwitch: LanguageSwitcher;

  private login: Login;

  private player: Player;

  private songsBlockPopular: SongsBlock | undefined;

  private songsBlockRecently: SongsBlock | undefined;

  private pagination: Pagination | undefined;

  private genresBlock: GenresBlock | undefined;

  private leftMenu: LeftMenu | undefined;

  public songs: Array<SongData> = [];

  public genres: Array<GenreData> = [];

  public curGenre: GenreData | undefined;

  public base: Base;

  public router: Router;

  constructor(base: Base, router: Router) {
    this.base = base;
    this.router = router;
    this.body = document.body;
    this.state = new State();
    this.logo = new Logo();
    this.search = new SearchElem();
    this.langSwitch = new LanguageSwitcher();
    this.login = new Login();
    this.player = new Player();
    this.pagination = new Pagination(this);
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

    this.genres = [
      { key: 'pop', name: 'Popular', img: 'popular.jpg', bg1: 'rgb(175 175 39 / 71%)', bg2: 'yellow' },
      { key: 'rock', name: 'Rock', img: 'rock.jpg', bg1: '#7bb0a6', bg2: '#1dabb8' },
      { key: 'hip', name: 'Hip-hop', img: 'hip-hop.png', bg1: '#f29b34', bg2: '#ff7416' },
      { key: 'electronic', name: 'Electronic', img: 'electronic.png', bg1: '#777777', bg2: '#999999' },
      { key: 'dance', name: 'Dance', img: 'dance.png', bg1: '#2c82c9', bg2: '#83d6de' },
      { key: 'music', name: 'Lyric', img: 'lyric.jpg', bg1: '#7e3661', bg2: '#bb3658' },
      { key: 'house', name: 'House', img: 'house.png', bg1: '#a0b58d', bg2: '#8c7e51' },
    ];

    const rand = Math.round(Math.random() * 330);
    this.base.getOneSong(rand).then((result) => {
      if (result.item) this.player.add(result.item);
    });

    this.leftMenu = new LeftMenu(this);
    const leftSide: HTMLElement = this.body.querySelector('.top__left-menu') as HTMLElement;
    leftSide.append(this.leftMenu.leftMenu);

    let tmpGen: GenreData | undefined;
    let tmpPage = 1;
    if (this.router.page !== null) tmpPage = this.router.page;
    if (this.router.genre !== null) tmpGen = this.genres.find((item) => item.key === this.router.genre);

    this.base
      .getSet(500, 1)
      .then((result) => (this.songs = result.items))
      .then(() => {
        for (let i = 0; i < this.genres.length; i += 1) {
          console.log(this.songs);
          const arr = this.songs.filter((elem) => elem.genre === this.genres[i].key);
          this.genres[i].count = arr.length;
        }
      })
      .then(() => {
        if (tmpGen && this.router.genre) this.getSongs('genre', this.router.genre, tmpGen.name, tmpPage);
        else this.showMain();
      });

    this.addListeners();
  }

  public playSong(id: number) {
    const curSong = this.songs.find((elem) => elem.id === id);
    if (curSong) this.player.add(curSong);
  }

  public async getSongs(type: string, val: string, title: string, page: number) {
    let numPages = 1;
    if (type == 'genre') {
      this.curGenre = this.genres.find((item) => item.key === val);
      if (this.curGenre && this.curGenre.count) numPages = Math.ceil(this.curGenre.count / nSongInPage);
      this.base
        .getGenre(page, nSongInPage, val)
        .then((result) => {
          if (result.items.tracks) {
            this.showCollectionOfSongs(result.items.tracks, title);
          }
        })
        .then(() => {
          const titleMain = document.querySelector('.top__wrapper-title') as HTMLElement;
          if (this.pagination && titleMain) {
            titleMain.after(this.pagination.createPagination(page, numPages));
          }
        });
    }
  }

  public showCollectionOfSongs(songs: Array<SongData>, title: string) {
    const main: HTMLElement = this.body.querySelector('.top__main') as HTMLElement;
    main.innerHTML = '';
    const tmpSongs = new SongsBlock(title, songs, this);
    main.append(tmpSongs.songsBlock);
  }

  public async showMain() {
    const main: HTMLElement = this.body.querySelector('.top__main') as HTMLElement;
    if (!main) {
      throw new Error("Can't find main element");
    }
    main.innerHTML = '';
    const title = this.checkTitlesBlock();
    this.base
      .getSet(10, 1)
      .then((result) => {
        this.songsBlockPopular = new SongsBlock(title[0], result.items, this);
        main.append(this.songsBlockPopular.songsBlock);
        this.genresBlock = new GenresBlock(title[1], this.genres, this);
        if (this.genresBlock) main.append(this.genresBlock.genresBlock);
      })
      .then(() => this.base.getSet(10, 2))
      .then((result) => {
        this.songsBlockRecently = new SongsBlock(title[2], result.items, this);

        main.append(this.songsBlockRecently.songsBlock);
      });
  }

  private checkTitlesBlock(): string[] {
    const enText: string[] = ['Popular songs', 'Music by genres', 'Recently played', 'next', 'prev'];
    const ruText: string[] = ['Популярные песни', 'Музыка по жанрам', 'Слушают сейчас', 'след', 'пред'];

    return this.state.getLang() === 'en' ? enText : ruText;
  }

  private addListeners(): void {
    const lang: HTMLElement = this.langSwitch.getElems();
    lang.addEventListener('click', this.changeLang.bind(this));
  }

  private changeLang(ev: Event): void {
    ev.stopPropagation();
    console.log('++++');
    const language: string | undefined = this.state.getLang();
    const langSwitchData = language === 'en' ? 'ru' : 'en';
    this.state.setlang(langSwitchData);
    this.langSwitch.switch();
    this.search.switchlanguage(this.state);
    this.genresBlock?.switchLang();
    this.songsBlockPopular?.switchLang();
    this.songsBlockRecently?.switchLang();
    this.leftMenu?.switchLang();
    this.login.switchLang(this.state);
    if (this.pagination) this.pagination.switchLang(this.state);
  }
}
