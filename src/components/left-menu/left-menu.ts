import './left-menu.scss';
import { createByTag } from '../../utils/constants';
import Page from '../page';
import State from '../../utils/state';

export default class LeftMenu {
  public leftMenu: HTMLElement;

  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.leftMenu = this.createMenu();
  }

  public switchLang(): void {
    const title = this.leftMenu.querySelector('.left-menu__href') as HTMLElement;
    title.textContent = title.textContent === 'Home' ? 'Главная' : 'Home';
    const pl = this.leftMenu.querySelector('.left-menu__playlist') as HTMLElement;
    pl.textContent = pl.textContent === 'PlayList' ? 'Плейлист' : 'PlayList';
  }

  private createMenu(): HTMLElement {
    const wrapper = createByTag({ tag: 'div', class: 'left-menu__wrapper' });

    const ul = createByTag({ tag: 'ul', class: 'left-menu__list', parent: wrapper });
    const li = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ul });
    const state = new State();
    const text: string = state.getLang() === 'en' ? 'Home' : 'Главная';
    li.innerHTML = `<i class="fa-solid fa-house"></i> <span class="left-menu__list-item"><a class="left-menu__href" href="./">${text}</a></li>`;

    const li1 = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ul });
    const text1: string = state.getLang() === 'en' ? 'PlayList' : 'Плейлист';
    li1.innerHTML = `<i class="fa-solid fa-folder-open"></i> <span class="left-menu__list-item"><span class="left-menu__href left-menu__playlist">${text1}</span></li>`;
    li1.addEventListener('click', () => {
      this.page.getPlayList();
      this.page.router.clear();
    });
    //li1.style.display = 'none';

    const ulGenres = createByTag({ tag: 'ul', class: 'left-menu__list', parent: wrapper });
    this.page.genres.forEach((item) => {
      const liG = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ulGenres });
      liG.innerHTML = `<a class="left-menu__href" href="./?genre=${item.key}">${item.name}</a>`;
    });
    return wrapper;
  }
}
