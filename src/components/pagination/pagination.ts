import Page from '../page';
import { createByTag } from '../../utils/heap';
import './pagination.scss';

export default class Pagination {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public createPagination(curPage = 1, allPages = 1): void {
    const title = document.querySelector('.top__wrapper-title') as HTMLSpanElement;
    const div = <HTMLElement>createByTag({ tag: 'div', id: 'pagination' });
    const left = <HTMLButtonElement>createByTag({
      tag: 'button',
      id: 'page-back',
      class: 'top__page-button',
      parent: div,
    });
    left.innerHTML = ' &larr; prev';
    left.disabled = curPage <= 1 ? true : false;
    const right = <HTMLButtonElement>createByTag({
      tag: 'button',
      id: 'page-forward',
      class: 'top__page-button',
      parent: div,
    });
    right.innerHTML = 'next &rarr;';
    right.disabled = curPage < allPages - 1 ? true : false;
    right.disabled = true;
    title.after(div);
  }
}
