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
import { nSongInPage, genres } from '../utils/constants';
import LoginPopUp from './popup-section/connect-popup';

export default class Page {
  private body: HTMLElement;

  public readonly state: State;

  private logo: Logo;

  private search: SearchElem;

  private langSwitch: LanguageSwitcher;

  private login: Login;

  private player: Player;

  private songsBlockPopular: SongsBlock;

  private songsBlockRecently: SongsBlock;

  private pagination: Pagination;

  private genresBlock: GenresBlock;

  private leftMenu: LeftMenu;

  private songs: Array<SongData> = [];

  public genres: Array<GenreData> = genres;

  public curGenre: GenreData;

  public base: Base;

  public router: Router;

  public playListID: Array<number> = [];

  private plsShow = false;

  constructor(base: Base, router: Router) {
    this.base = base;
    this.router = router;
    this.body = document.body;
    this.state = this.base.state;
    this.logo = new Logo();
    this.search = new SearchElem(this);
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

    this.leftMenu = new LeftMenu(this);
    const leftSide: HTMLElement = this.body.querySelector('.top__left-menu') as HTMLElement;
    leftSide.append(this.leftMenu.leftMenu);

    let tmpGen: GenreData | undefined;
    let tmpPage = 1;
    if (this.router.page !== null) tmpPage = this.router.page;
    if (this.router.genre !== null) tmpGen = this.genres.find((item) => item.key === this.router.genre);

    this.base
      .getSet(500, 1)
      .then((songs: SongData[]) => (this.songs = songs))
      .then(() => {
        if (this.state.getAuth()) {
          return this.base.getPlayList(this.state.getUser(), this.state.getToken());
        }
        return null;
      })
      .then((data: PlsData | null) => {
        if (data && data.tracks) this.playListID = data.tracks.map((elem: SongData) => elem.id);
      })
      .then(() => {
        for (let i = 0; i < this.genres.length; i += 1) {
          const arr = this.songs.filter((elem) => elem.genre === this.genres[i].key);
          this.genres[i].count = arr.length;
        }
      })
      .then(() => {
        if (tmpGen && this.router.genre) this.getSongs('genre', this.router.genre, tmpGen.name, tmpPage);
        else if (this.router.search) this.getSongs('search', this.router.search, '', 1);
        else this.showMain();
      })
      .then(() => {
        const rand = Math.round(Math.random() * 330);
        this.base.getOneSong(rand).then((song: SongData) => {
          if (song) this.player.add(song);
        });
      });

    this.addListeners();
  }

  public playSong(id: number): void {
    const curSong: SongData = this.songs.find((elem: SongData) => elem.id === id);
    if (curSong) this.player.add(curSong);
  }

  public async getPlayList(): Promise<void> {
    this.base.getPlayList(this.state.getUser(), this.state.getToken()).then((songs: PlsData) => {
      const title: string = this.state.getLang() === 'en' ? 'Playlist' : '????????????????';
      if (songs && Array.isArray(songs.tracks)) {
        this.playListID = songs.tracks.map((elem: SongData) => elem.id);
        this.showCollectionOfSongs(songs.tracks, title);
      }
      this.router.clear();
    });
  }

  public async getSongs(type: string, val: string, title: string, page: number): Promise<void> {
    let numPages = 1;

    if (type === 'genre') {
      this.curGenre = this.genres.find((item) => item.key === val);
      if (this.curGenre && this.curGenre.count) numPages = Math.ceil(this.curGenre.count / nSongInPage);
      this.base
        .getGenre(page, nSongInPage, val)
        .then((songs) => {
          if (songs) {
            this.showCollectionOfSongs(songs, title);
          }
        })
        .then(() => {
          const titleMain = document.querySelector('.top__wrapper-title') as HTMLElement;
          if (this.pagination && titleMain) {
            titleMain.after(this.pagination.createPagination(page, numPages));
          }
        });
    }
    if (type === 'search') {
      this.base.getSearch(val).then((songs) => {
        if (songs) {
          const language: string | undefined = this.state.getLang();
          const langSwitchData = language === 'en' ? 'Search results' : '???????????????????? ????????????';

          const arrTitle: Array<string> = [];
          const newArr: Array<SongData> = [];
          songs.forEach((elem: SongData) => {
            if (arrTitle.indexOf(elem.title) == -1) {
              newArr.push(elem);
              arrTitle.push(elem.title);
            }
          });
          this.showCollectionOfSongs(newArr, `${langSwitchData} ${val}`);
        }
      });
    }
  }

  private showCollectionOfSongs(songs: Array<SongData>, title: string): void {
    const main: HTMLElement = this.body.querySelector('.top__main') as HTMLElement;
    const lang = this.checkTitlesBlock();
    main.innerHTML = '';
    if (songs.length > 0) {
      const tmpSongs = new SongsBlock(title, songs, this);
      main.append(tmpSongs.songsBlock);
    } else main.innerHTML = `<div class="find__nothing">${lang[5]}</div>`;
  }

  private async showMain(): Promise<void> {
    const main: HTMLElement = this.body.querySelector('.top__main') as HTMLElement;
    if (!main) {
      throw new Error("Can't find main element");
    }
    main.innerHTML = '';
    const title = this.checkTitlesBlock();
    this.base
      .getSet(10, 1)
      .then((songs) => {
        this.songsBlockPopular = new SongsBlock(title[0], songs, this);
        main.append(this.songsBlockPopular.songsBlock);
        this.genresBlock = new GenresBlock(title[1], this.genres, this);
        if (this.genresBlock) main.append(this.genresBlock.genresBlock);
      })
      .then(() => this.base.getSet(10, 2))
      .then((songs) => {
        this.songsBlockRecently = new SongsBlock(title[2], songs, this);

        main.append(this.songsBlockRecently.songsBlock);
      });
  }

  private checkTitlesBlock(): string[] {
    const enText: string[] = [
      'Popular songs',
      'Music by genres',
      'Recently played',
      'next',
      'prev',
      'Nothing found',
      'Search results',
    ];
    const ruText: string[] = [
      '???????????????????? ??????????',
      '???????????? ???? ????????????',
      '?????????????? ????????????',
      '????????',
      '????????',
      '???????????? ???? ??????????????',
      '?????????????????????? ????????????',
    ];

    return this.state.getLang() === 'en' ? enText : ruText;
  }

  private addListeners(): void {
    const lang: HTMLElement = this.langSwitch.getElems();
    lang.addEventListener('click', this.changeLang.bind(this));

    const login = this.body.querySelector('.top__login-wrapper') as HTMLElement;
    login.addEventListener('click', this.loginListener.bind(this));

    document.addEventListener('showPlayList', () => {
      this.plsShow = true;
      this.getPlayList();
    });

    document.addEventListener('changeSongPL', (e: Event) => {
      const event = <CustomEvent>e;
      this.changePlayList(event.detail.id);
    });
  }

  private async changePlayList(id: number): Promise<void> {
    let pls: Playlist;
    if (this.playListID.includes(id)) {
      pls = await this.base.removeSongFromPlayList(this.state.getUser(), this.state.getToken(), id);
    } else {
      pls = await this.base.addSongToPlayList(this.state.getUser(), this.state.getToken(), id);
    }
    this.playListID = pls.pls.songsID;
    sessionStorage.setItem('pls', JSON.stringify(pls.pls));
    if (this.plsShow) {
      this.replacePlsCards(pls.pls.tracks);
    }
  }

  private loginListener(ev: Event): void {
    ev.stopPropagation();
    const container = this.body.querySelector('.container') as HTMLElement;
    const isAuth = this.state.getAuth();
    const loginConstructor = new LoginPopUp(this.state);
    if (!isAuth) {
      loginConstructor.wndSignIn();
    } else {
      loginConstructor.wndAccount();
    }
    const wndAuth = loginConstructor.getWND();
    container.prepend(wndAuth);
  }

  private changeLang(ev: Event): void {
    ev.stopPropagation();
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
    this.logo.switchLang(this.state);
    if (this.pagination) this.pagination.switchLang(this.state);
    const plsTitle: HTMLElement = document.querySelector('.top__title-block');
    if (!plsTitle) return;
    if (plsTitle.textContent === 'Playlist' || plsTitle.textContent === '????????????????') {
      plsTitle.textContent = this.state.getLang() === 'en' ? 'Playlist' : '????????????????';
    }
  }

  private replacePlsCards(data: SongData[]): void {
    const block = this.body.querySelector('.top__cards-block');
    if (block) block.replaceChildren();
    const title: string = this.state.getLang() === 'en' ? 'Playlist' : '????????????????';
    this.showCollectionOfSongs(data, title);
  }
}
