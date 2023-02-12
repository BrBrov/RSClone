import './left-menu.scss';
import { createByTag } from '../../utils/heap';
import Page from '../page';

export default class LeftMenu {
  public leftMenu: HTMLElement;

  page: Page;

  constructor(page: Page) {
    this.page = page;
    console.log('hi');
    this.leftMenu = this.createMenu();
  }

  private createMenu() {
    const wrapper = createByTag({ tag: 'div', class: 'left-menu__wrapper' });

    const ul = createByTag({ tag: 'ul', class: 'left-menu__list', parent: wrapper });
    const li = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ul });
    li.innerHTML =
      '<i class="fa-solid fa-house"></i> <span class="left-menu__list-item"><a class="left-menu__href" href="./">Home</a></li>';
    /*
    TODO: many playLists
    li = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ul });
    li.innerHTML = '<i class="fa-solid fa-square-plus"></i> <span>Create PlayList</li>';
    */

    const ulGenres = createByTag({ tag: 'ul', class: 'left-menu__list', parent: wrapper });
    this.page.genres.forEach((item) => {
      const liG = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ulGenres });
      liG.innerHTML = `<a class="left-menu__href" href="./?genre=${item.key}">${item.name}</a>`;
    });
    return wrapper;
  }
}
