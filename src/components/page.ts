import '../assets/svg/git.svg';
import '../assets/png/rss.png';
import './page.scss';
import Player from './player/player';
import SongsBlock from './songs-block/songs-block';

export default class Page {
  private body: HTMLElement;

  private player: Player;

  private songsBlock: SongsBlock | undefined;

  constructor() {
    this.body = document.body;
    this.player = new Player();
    this.init();
  }

  public start(): void {
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

  private init(): void {
    const pageContainer: HTMLElement = document.createElement('div');
    pageContainer.className = 'container';

    const page: HTMLElement = document.createElement('div');
    page.className = 'wrapper';

    pageContainer.append(page);

    const top = document.createElement('div');
    top.className = 'top';

    page.append(top);

    const footer = document.createElement('footer');
    footer.className = 'footer';

    this.createFooter(footer);

    page.append(footer);

    const left = document.createElement('div');
    left.className = 'top__left-side';

    this.createLeftSide(left);

    top.append(left);

    const right = document.createElement('div');
    right.className = 'top__right-side';

    this.createRightSide(right);

    top.append(right);

    this.body.append(pageContainer);
  }

  private createFooter(footer: HTMLElement): void {
    let wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'footer__git-wrapper';

    let img: HTMLImageElement = document.createElement('img');
    img.className = 'footer__git-img';
    img.alt = 'Git';
    img.src = './assets/svg/git.svg';

    img.addEventListener('click', (): void => {
      location.href = 'https://github.com/BrBrov/RSClone';
    });

    wrapper.append(img);
    footer.append(wrapper);

    wrapper = document.createElement('div');
    wrapper.className = 'footer__rs-wrapper';

    img = document.createElement('img');
    img.className = 'footer__rs-img';
    img.alt = 'RSSchool';
    img.src = './assets/png/rss.png';

    img.addEventListener('click', (): void => {
      location.href = 'https://rs.school';
    });

    wrapper.append(img);
    footer.append(wrapper);
  }

  private createLeftSide(left: HTMLElement): void {
    let container: HTMLElement = document.createElement('div');
    container.className = 'top__left-menu';

    left.append(container);

    container = document.createElement('div');
    container.className = 'top__player-wrapper';

    left.append(container);
  }

  private createRightSide(right: HTMLElement): void {
    let container: HTMLElement = document.createElement('header');
    container.className = 'top__header';

    right.append(container);

    container = document.createElement('main');
    container.className = 'top__main';

    right.append(container);
  }
}
