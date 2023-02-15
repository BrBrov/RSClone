import State from '../../utils/state';
import './lang-button.scss';

export default class LangquageSwitcher {
  private readonly langBtn: HTMLElement;

  constructor() {
    this.langBtn = this.init();
  }

  public switch(): void {
    const first = new KeyframeEffect(this.langBtn, [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-90deg)' }], {
      duration: 500,
      fill: 'forwards',
    });

    let anim = new Animation(first);

    anim.onfinish = () => {
      const second = new KeyframeEffect(
        this.langBtn,
        [{ transform: 'rotateY(90deg)' }, { transform: 'rotateY(0deg)' }],
        { duration: 500, fill: 'forwards' }
      );
      this.langBtn.textContent = this.langBtn.textContent === 'EN' ? 'RU' : 'EN';
      anim = new Animation(second);
      anim.play();
    };

    anim.play();
  }

  public getElems(): HTMLElement {
    return this.langBtn;
  }

  private init(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__lang-wrapper';

    const text: HTMLSpanElement = document.createElement('span');
    text.className = 'top__lang-text';
    const state = new State();
    text.textContent = state.getLang() === 'en' ? 'EN' : 'RU';

    wrapper.append(text);

    return wrapper;
  }
}
