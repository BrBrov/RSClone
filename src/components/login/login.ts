import './login.scss';
import '../../assets/svg/key.svg';
import '../../assets/svg/autorized.svg';
import State from '../../utils/state';

export default class Login {
  private loginBtn: HTMLElement;

  constructor() {
    this.loginBtn = this.createLoginBtn();
  }

  public getElems(): HTMLElement {
    return this.loginBtn;
  }

  private createLoginBtn(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'top__login-wrapper';

    const imgWrap: HTMLElement = document.createElement('div');
    imgWrap.className = 'top__login-block';

    const state = new State();

    const img: HTMLImageElement = document.createElement('img');
    img.className = 'top__login-avatar';
    img.alt = 'Login';

    if (state.getAuth()) {
      //TODO: add logic for get avatar;
      img.src = './assets/svg/autorized.svg';
    } else {
      img.src = './assets/svg/key.svg';
    }

    imgWrap.append(img);
    wrapper.append(imgWrap);

    const text: HTMLSpanElement = document.createElement('span');
    text.className = 'top__login-text';

    if (state.getAuth()) {
      text.textContent = state.getLang() === 'eu' ? 'Account' : 'Аккаунт';
    } else {
      text.textContent = state.getLang() === 'eu' ? 'Sign In' : 'Вход';
    }

    wrapper.append(text);

    return wrapper;
  }
}
