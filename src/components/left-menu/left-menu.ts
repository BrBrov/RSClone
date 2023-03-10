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
  }

  private createMenu(): HTMLElement {
    const wrapper = createByTag({ tag: 'div', class: 'left-menu__wrapper' });

    const ul = createByTag({ tag: 'ul', class: 'left-menu__list', parent: wrapper });
    const li = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ul });
    const state = new State();
    const text: string = state.getLang() === 'en' ? 'Home' : 'Главная';
    li.innerHTML = `<i class="fa-solid fa-house"></i> <span class="left-menu__list-item"><a class="left-menu__href" href="./">${text}</a></li>`;

    const ulGenres = createByTag({ tag: 'ul', class: 'left-menu__list', parent: wrapper });
    this.page.genres.forEach((item) => {
      const liG = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ulGenres });
      liG.innerHTML = `<span class="left-menu__href" >${item.name}</span>`;
      liG.addEventListener('click', () => {
        this.page.getSongs('genre', item.key, item.name, 1);
        this.page.router.setGenre(item.key);
      });
    });
    return wrapper;
  }
}
