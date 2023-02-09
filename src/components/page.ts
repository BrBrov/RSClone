import '../assets/svg/git.svg';
import '../assets/png/rss.png';
import './page.scss';
import Player from './player/player';

export default class Page {
  private body: HTMLElement;

  private player: Player;

  constructor() {
    this.body = document.body;
    this.player = new Player();
    this.init();
  }

  public start(): void {
    const playerWrapper: HTMLElement = document.querySelector('.top__player-wrapper') as HTMLElement;
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
