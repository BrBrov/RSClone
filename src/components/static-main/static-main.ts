import './static-main.scss';

export default class StaticMain {
  private readonly staticElems: HTMLElement;

  constructor() {
    this.staticElems = this.init();
  }

  public getElems(): HTMLElement {
    return this.staticElems;
  }

  private init(): HTMLElement {
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

    return pageContainer;
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
