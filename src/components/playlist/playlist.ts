import State from '../../utils/state';
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

  public switchlanguage(state: State): void {
    const lang = state.getLang();
    const text = lang === 'en' ? 'PlayList' : 'Избранное';

    const title = document.querySelector('.top__title-block') as HTMLElement;
    if (title !== null) title.innerHTML = text;
  }

  private createPlayList(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__pl-wrapper';

    return wrapper;
  }
}
