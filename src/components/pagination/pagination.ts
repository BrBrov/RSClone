import Page from '../page';
import { createByTag } from '../../utils/heap';
import './pagination.scss';
import State from '../../utils/state';

export default class Pagination {
  page: Page;

  right: HTMLButtonElement | null = null;

  left: HTMLButtonElement | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  public createPagination(curPage = 1, allPages = 1) {
    const state = new State();
    const prev: string = state.getLang() === 'en' ? 'prev' : 'пред';
    const next: string = state.getLang() === 'en' ? 'next' : 'след';

    if (curPage < 1) curPage = 1;
    const div = <HTMLElement>createByTag({ tag: 'div', id: 'pagination' });
    this.right = <HTMLButtonElement>createByTag({
      tag: 'button',
      id: 'page-forward',
      class: 'top__page-button',
      parent: div,
    });
    this.right.innerHTML = `${next} &rarr;`;
    this.left = <HTMLButtonElement>createByTag({
      tag: 'button',
      id: 'page-back',
      class: 'top__page-button',
      parent: div,
    });
    this.left.innerHTML = ` &larr; ${prev}`;
    if (curPage > 1) this.left.style.display = 'inline-block';
    else this.left.style.display = 'none';
    this.left.addEventListener('click', () => {
      if (this.page.curGenre) {
        this.page.getSongs('genre', this.page.curGenre.key, this.page.curGenre.name, curPage - 1);
        this.page.router.setPage(curPage - 1);
      }
    });

    if (curPage < allPages) this.right.style.display = 'inline-block';
    else this.right.style.display = 'none';
    this.right.addEventListener('click', () => {
      if (this.page.curGenre) {
        this.page.getSongs('genre', this.page.curGenre.key, this.page.curGenre.name, curPage + 1);
        this.page.router.setPage(curPage + 1);
      }
    });

    return div;
  }

  public switchLang(state: State): void {
    const prev: string = state.getLang() === 'en' ? 'prev' : 'пред';
    const next: string = state.getLang() === 'en' ? 'next' : 'след';
    if (this.right) this.right.innerHTML = `${next} &rarr;`;
    if (this.left) this.left.innerHTML = `${prev} &rarr;`;
  }
}
