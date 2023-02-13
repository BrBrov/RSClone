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

    //TODO: fake data!

    const fake: SongData = {
      id: 1,
      artist: 'Sam Smith & Kim Petras',
      title: 'Unholy',
      genre: 'pop',
      file:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/3c/2c/82/3c2c8235-9907-0405-b21c-8fd66d285e56/mzaf_6122099414111658029.plus.aac.ep.m4a',
      logo:
        'https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/0d/97/a6/0d97a649-760f-522c-269d-9d710dc372ba/22UM1IM07174.rgb.jpg/400x400cc.jpg',
    };

    this.player.add(fake);

    //TODO: need real songs
    this.songs = [
      {
        id: 1,
        artist: 'Harry Styles',
        title: 'Late Night Talking',
        genre: 'pop',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/3c/2c/82/3c2c8235-9907-0405-b21c-8fd66d285e56/mzaf_6122099414111658029.plus.aac.ep.m4a',
        logo:
          'https://is4-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/400x400cc.jpg',
      },
      {
        id: 2,
        artist: 'Oliver Tree & Robin Schulz',
        title: 'Miss You',
        genre: 'pop',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/78/d1/8f/78d18f9f-671b-3c3c-0033-917651170937/mzaf_14625856779470870222.plus.aac.ep.m4a',
        logo:
          'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/69/e0/27/69e02785-714c-d0b9-ba68-04a2361fa7e5/075679730466.jpg/400x400cc.jpg',
      },
      {
        id: 3,
        artist: 'Rihanna',
        title: 'Lift Me Up (From Black Panther: Wakanda Forever - Music From and Inspired By)',
        genre: 'pop',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/37/ec/71/37ec7188-c1f5-47c1-43a7-28d32e26f172/mzaf_7868625517086999040.plus.aac.ep.m4a',
        logo:
          'https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/46/17/80/461780d4-8620-3e89-7cc4-7f1f08152924/22UM1IM24755.rgb.jpg/400x400cc.jpg',
      },
      {
        id: 4,
        artist: 'Lil Nas X',
        title: 'STAR WALKIN(League of Legends Worlds Anthem)',
        genre: 'hip',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/6d/4b/66/6d4b6697-57ec-f34c-a56d-53c7fe48acea/mzaf_14430168494514608993.plus.aac.ep.m4a',
        logo:
          'https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ba/4c/c4/ba4cc4e4-50e5-04f8-b865-389fdf0dfc38/dj.vdbsglhz.jpg/400x400cc.jpg',
      },
      {
        id: 1,
        artist: 'Harry Styles',
        title: 'Late Night Talking',
        genre: 'pop',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/3c/2c/82/3c2c8235-9907-0405-b21c-8fd66d285e56/mzaf_6122099414111658029.plus.aac.ep.m4a',
        logo:
          'https://is4-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/400x400cc.jpg',
      },
      {
        id: 2,
        artist: 'Oliver Tree & Robin Schulz',
        title: 'Miss You',
        genre: 'pop',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/78/d1/8f/78d18f9f-671b-3c3c-0033-917651170937/mzaf_14625856779470870222.plus.aac.ep.m4a',
        logo:
          'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/69/e0/27/69e02785-714c-d0b9-ba68-04a2361fa7e5/075679730466.jpg/400x400cc.jpg',
      },
      {
        id: 3,
        artist: 'Rihanna',
        title: 'Lift Me Up (From Black Panther: Wakanda Forever - Music From and Inspired By)',
        genre: 'pop',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/37/ec/71/37ec7188-c1f5-47c1-43a7-28d32e26f172/mzaf_7868625517086999040.plus.aac.ep.m4a',
        logo:
          'https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/46/17/80/461780d4-8620-3e89-7cc4-7f1f08152924/22UM1IM24755.rgb.jpg/400x400cc.jpg',
      },
      {
        id: 4,
        artist: 'Lil Nas X',
        title: 'STAR WALKIN(League of Legends Worlds Anthem)',
        genre: 'rock',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/6d/4b/66/6d4b6697-57ec-f34c-a56d-53c7fe48acea/mzaf_14430168494514608993.plus.aac.ep.m4a',
        logo:
          'https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ba/4c/c4/ba4cc4e4-50e5-04f8-b865-389fdf0dfc38/dj.vdbsglhz.jpg/400x400cc.jpg',
      },
      {
        id: 1,
        artist: 'Harry Styles',
        title: 'Late Night Talking',
        genre: 'rock',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/3c/2c/82/3c2c8235-9907-0405-b21c-8fd66d285e56/mzaf_6122099414111658029.plus.aac.ep.m4a',
        logo:
          'https://is4-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/400x400cc.jpg',
      },
      {
        id: 2,
        artist: 'Oliver Tree & Robin Schulz',
        title: 'Miss You',
        genre: 'hip',
        file:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/78/d1/8f/78d18f9f-671b-3c3c-0033-917651170937/mzaf_14625856779470870222.plus.aac.ep.m4a',
        logo:
          'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/69/e0/27/69e02785-714c-d0b9-ba68-04a2361fa7e5/075679730466.jpg/400x400cc.jpg',
      },
    ];

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

    const main: HTMLElement = this.body.querySelector('.top__main') as HTMLElement;
    this.songsBlockPopular = new SongsBlock('Popular songs', this.songs, this);
    main.append(this.songsBlockPopular.songsBlock);

    this.genresBlock = new GenresBlock('Music by genres', this.genres, this);
    main.append(this.genresBlock.genresBlock);

    this.songsBlockRecently = new SongsBlock('Recently played', this.songs, this);
    main.append(this.songsBlockRecently.songsBlock);
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
}
