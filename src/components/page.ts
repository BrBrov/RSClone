import '../assets/svg/git.svg';
import '../assets/png/rss.png';
import Player from './player/player';
import SongsBlock from './songs-block/songs-block';
import State from '../utils/state';
import StaticMain from './static-main/static-main';
import SearchElem from './search/search';

export default class Page {
  private body: HTMLElement;

  private state: State;

  private search: SearchElem;

  private player: Player;

  private songsBlock: SongsBlock | undefined;

  constructor() {
    this.body = document.body;
    this.state = new State();
    this.search = new SearchElem();
    this.player = new Player();
  }

  public start(): void {
    this.body.append(new StaticMain().getElems());

    const header: HTMLElement = this.body.querySelector('.top__header') as HTMLElement;
    header.append(this.search.getElem());

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

    const songs: Array<SongData> = [
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
        genre: 'pop',
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
        genre: 'pop',
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
    ];

    this.songsBlock = new SongsBlock('Popular songs', songs);

    const main: HTMLElement = this.body.querySelector('.top__main') as HTMLElement;

    main.append(this.songsBlock.songsBlock);
  }
}
