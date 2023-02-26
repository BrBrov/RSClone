import Page from '../page';

export default class PlayList {
  private readonly playList: HTMLElement;

  private page: Page;

  constructor(page: Page) {
    this.playList = this.createPlayList();
    this.page = page;
  }

  public getElem(): HTMLElement {
    return this.playList;
  }

  private createPlayList(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__pl-wrapper';

    return wrapper;
  }
}
