import './left-menu.scss';
import { createByTag } from '../../utils/heap';

export default class LeftMenu {
  public leftMenu: HTMLElement;

  constructor() {
    console.log('hi');
    this.leftMenu = this.createMenu();
  }

  private createMenu() {
    const wrapper = createByTag({ tag: 'div', class: 'left-menu__wrapper' });
    const logoWrap = createByTag({ tag: 'div', class: 'left-menu__logo', parent: wrapper });

    const a = <HTMLAnchorElement>createByTag({ tag: 'a', parent: logoWrap });
    a.href = './';
    const logoImg = <HTMLImageElement>createByTag({ tag: 'img', class: 'left-menu__img', parent: a });
    logoImg.src = './assets/img/logo.png';
    logoImg.alt = 'Mysify';

    const ul = createByTag({ tag: 'ul', class: 'left-menu__list', parent: wrapper });
    let li = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ul });
    li.innerHTML = '<i class="fa-solid fa-house"></i> <span class="left-menu__list-item">Home</li>';
    li = createByTag({ tag: 'li', class: 'left-menu__list-item', parent: ul });
    li.innerHTML = '<i class="fa-solid fa-square-plus"></i> <span>Create PlayList</li>';

    return wrapper;
  }
}
