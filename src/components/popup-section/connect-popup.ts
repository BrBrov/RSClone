import './connect-popup.scss';
import './account.scss';
import '../../assets/svg/autorized.svg';
import State from '../../utils/state';
import Warning from './warning';
import Authorization from '../../utils/authorization';

export default class LoginPopUp {
  private isValidLogin = false;

  private isValidPass = false;

  private wnd: HTMLElement;

  private state: State;

  constructor(state: State) {
    this.state = state;
    this.wnd = document.createElement('div');
    this.wnd.className = 'container__pop-wrapper';
    this.wnd.addEventListener('wheel', (ev: Event) => ev.preventDefault());
  }

  public getWND(): HTMLElement {
    return this.wnd;
  }

  public wndSignIn(): void {
    this.isValidLogin = false;
    this.isValidPass = false;
    const lang = this.state.getLang();
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'container__in-wrapper';

    let block: HTMLElement = document.createElement('div');
    block.className = 'container__exit-wrapper';

    const close: HTMLSpanElement = document.createElement('span');
    close.className = 'container__exit-popup ';
    close.innerHTML = '<i class="container__close-img fa-solid fa-circle-xmark"></i>';

    const closeImg = close.querySelector('.container__close-img') as HTMLElement;

    closeImg.addEventListener('click', this.close.bind(this));

    block.append(close);
    wrapper.append(block);

    let text: HTMLSpanElement = document.createElement('span');
    text.className = 'container__wnd-title';
    text.textContent = lang === 'en' ? 'SignIn' : 'Вход в аккаунт';

    wrapper.append(text);

    let input: HTMLInputElement = document.createElement('input');
    input.className = 'container__login-input';
    input.type = 'text';
    input.placeholder = lang === 'en' ? 'Enter your login' : 'Введите логин';
    input.maxLength = 24;
    input.minLength = 3;
    input.required = true;

    input.addEventListener('blur', this.loginListener.bind(this));

    wrapper.append(input);

    block = document.createElement('div');
    block.className = 'container__pass-block';

    input = document.createElement('input');
    input.className = 'container__pass-input';
    input.type = 'password';
    input.placeholder = lang === 'en' ? 'Enter your password' : 'Введите проль';
    input.minLength = 6;
    input.maxLength = 128;
    input.required = true;
    input.autocomplete = 'current-password';

    input.addEventListener('blur', this.passListener.bind(this));

    block.append(input);

    text = document.createElement('span');
    text.className = 'container__pass-show';
    text.innerHTML = '<i class="container__show-img fa-solid fa-key"></i>';

    const showPass = text.querySelector('.container__show-img') as HTMLElement;

    showPass.addEventListener('click', this.showPass.bind(this));

    block.append(text);
    wrapper.append(block);

    const btn: HTMLButtonElement = document.createElement('button');
    btn.className = 'container__sign-in';
    btn.textContent = lang === 'en' ? 'Enter' : 'Вход';

    btn.addEventListener('click', this.signIn.bind(this));

    wrapper.append(btn);

    block = document.createElement('div');
    block.className = 'container__to-signup';

    text = document.createElement('span');
    text.className = 'container__label-invitation';
    text.textContent = lang === 'en' ? "Don't have an account?" : 'У вас нет аккаунта?';

    block.append(text);

    text = document.createElement('span');
    text.className = 'container__invitation-register';
    text.textContent = lang === 'en' ? 'Register' : 'Зарегестрироваться';
    text.addEventListener('click', this.toSignUp.bind(this));

    block.append(text);
    wrapper.append(block);

    block = document.createElement('div');
    block.className = 'container__error-popup';

    wrapper.append(block);

    this.wnd.append(wrapper);
  }

  public wndSignUp(): void {
    this.isValidLogin = false;
    this.isValidPass = false;
    const lang = this.state.getLang();
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'container__up-wrapper';

    let block: HTMLElement = document.createElement('div');
    block.className = 'container__exit-wrapper';

    const close: HTMLSpanElement = document.createElement('span');
    close.className = 'container__exit-popup ';
    close.innerHTML = '<i class="container__close-img fa-solid fa-circle-xmark"></i>';

    const closeImg = close.querySelector('.container__close-img') as HTMLElement;

    closeImg.addEventListener('click', this.close.bind(this));

    block.append(close);
    wrapper.append(block);

    let text: HTMLSpanElement = document.createElement('span');
    text.className = 'container__wnd-title';
    text.textContent = lang === 'en' ? 'SignUn' : 'Регистрация';

    wrapper.append(text);

    let input: HTMLInputElement = document.createElement('input');
    input.className = 'container__login-input';
    input.type = 'text';
    input.placeholder = lang === 'en' ? 'Enter your login' : 'Введите логин';
    input.maxLength = 24;
    input.minLength = 3;
    input.required = true;

    input.addEventListener('blur', this.loginListener.bind(this));

    wrapper.append(input);

    block = document.createElement('div');
    block.className = 'container__pass-block';

    input = document.createElement('input');
    input.className = 'container__pass-input';
    input.type = 'password';
    input.placeholder = lang === 'en' ? 'Enter your password' : 'Введите проль';
    input.minLength = 6;
    input.maxLength = 128;
    input.required = true;
    input.autocomplete = 'current-password';

    input.addEventListener('blur', this.passListener.bind(this));

    block.append(input);

    text = document.createElement('span');
    text.className = 'container__pass-show';
    text.innerHTML = '<i class="container__show-img fa-solid fa-key"></i>';

    const showPass = text.querySelector('.container__show-img') as HTMLElement;

    showPass.addEventListener('click', this.showPass.bind(this));

    block.append(text);
    wrapper.append(block);

    const btn: HTMLButtonElement = document.createElement('button');
    btn.className = 'container__sign-up';
    btn.textContent = lang === 'en' ? 'SignUp' : 'Зарегестрировать';

    btn.addEventListener('click', this.signUp.bind(this));

    wrapper.append(btn);

    block = document.createElement('div');
    block.className = 'container__to-signup';

    text = document.createElement('span');
    text.className = 'container__label-invitation';
    text.textContent = lang === 'en' ? 'Does have an account?' : 'У вас есть аккаунт?';

    block.append(text);

    text = document.createElement('span');
    text.className = 'container__invitation-enter';
    text.textContent = lang === 'en' ? 'SignIn' : 'Войти';

    text.addEventListener('click', this.toSignIn.bind(this));

    block.append(text);
    wrapper.append(block);

    block = document.createElement('div');
    block.className = 'container__error-popup';

    wrapper.append(block);

    this.wnd.append(wrapper);
  }

  public wndAccount(): void {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'container__account-wrapper';

    let block: HTMLElement = document.createElement('div');
    block.className = 'container__exit-wrapper';

    const close: HTMLSpanElement = document.createElement('span');
    close.className = 'container__exit-popup ';
    close.innerHTML = '<i class="container__close-img fa-solid fa-circle-xmark"></i>';

    const closeImg = close.querySelector('.container__close-img') as HTMLElement;
    closeImg.addEventListener('click', this.close.bind(this));

    block.append(close);
    wrapper.append(block);

    let text: HTMLSpanElement = document.createElement('span');
    text.className = 'container__title-account';
    text.textContent = this.state.getLang() === 'en' ? 'Account' : 'Аккаунт';

    wrapper.append(text);

    block = document.createElement('div');
    block.className = 'container__title-block';

    const img: HTMLImageElement = document.createElement('img');
    img.className = 'container__account-img';
    img.alt = 'Avatar';
    img.src = './assets/svg/autorized.svg';

    block.append(img);

    text = document.createElement('span');
    text.className = 'container__login-name';
    text.textContent = this.state.getUser();

    block.append(text);
    wrapper.append(block);

    block = document.createElement('div');
    block.className = 'container__playlist-account';

    text = document.createElement('span');
    text.className = 'container__playlist-icon';
    text.innerHTML = '<i class="container__pls-icon fa-solid fa-ear-listen"></i>';

    block.append(text);

    text = document.createElement('span');
    text.className = 'container__account-playlist';
    text.textContent = this.state.getLang() === 'en' ? 'Playlist' : 'Плейлист';

    block.append(text);
    wrapper.append(block);

    const exitBtn: HTMLButtonElement = document.createElement('button');
    exitBtn.className = 'container__account-exit';
    exitBtn.textContent = this.state.getLang() === 'en' ? 'Exit' : 'Выход';

    exitBtn.addEventListener('click', this.exitAccount.bind(this));

    wrapper.append(exitBtn);

    this.wnd.append(wrapper);
  }

  private close(): void {
    this.wnd.remove();
  }

  private loginListener(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const value = target.value;
    const lang = this.state.getLang();
    if (value.length < 3) {
      target.value = '';
      target.placeholder = lang === 'en' ? 'Login must be more than 3 letters' : 'Логин должен быть более 3 букв';
      this.isValidLogin = false;
      setTimeout(() => {
        target.placeholder = lang === 'en' ? 'SignIn' : 'Вход в аккаунт';
      }, 1500);
      return;
    }

    if (!/[a-zA-Z]/.test(value)) {
      target.value = '';
      target.placeholder = lang === 'en' ? 'Login must be on english' : 'Логин должен быть на англиском';
      this.isValidLogin = false;
      setTimeout(() => {
        target.placeholder = lang === 'en' ? 'SignIn' : 'Вход в аккаунт';
      }, 1500);
      return;
    }

    if (target.validity) {
      this.isValidLogin = true;
    } else {
      this.isValidLogin = false;
      target.value = '';
    }
  }

  private passListener(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const value = target.value;
    const lang = this.state.getLang();

    if (!target.checkValidity()) {
      if (value.length < 6) {
        target.placeholder = lang === 'en' ? 'Password must be 6 symbols' : 'Пароль должен быть более 6 символов';
        setTimeout(() => {
          target.placeholder = lang === 'en' ? 'Enter your password' : 'Введите проль';
        }, 1500);
      } else {
        target.placeholder =
          lang === 'en' ? 'Password must be less 128 symbols' : 'Пароль должен быть менее 128 символов';
        setTimeout(() => {
          target.placeholder = lang === 'en' ? 'Enter your password' : 'Введите проль';
        }, 1500);
      }
      this.isValidPass = false;
    } else {
      this.isValidPass = true;
    }
  }

  private showPass(ev: Event): void {
    ev.stopPropagation();
    const input = document.querySelector('.container__pass-input') as HTMLInputElement;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  private signIn(ev: Event): void {
    ev.stopPropagation();
    if (this.isValidLogin && this.isValidPass) {
      const login: string = (this.wnd.querySelector('.container__login-input') as HTMLInputElement).value;
      const pass: string = (this.wnd.querySelector('.container__pass-input') as HTMLInputElement).value;
      const registration: Authorization = new Authorization();
      registration.logIn(login, pass).then((result: string) => {
        const warning: Warning = new Warning();
        const singInBlock: HTMLElement = this.wnd.querySelector('.container__error-popup') as HTMLElement;
        let warn: HTMLElement;
        switch (result) {
          case '2':
            warn = warning.unregistered(this.state.getLang());
            singInBlock.append(warn);
            setTimeout(() => warn.remove(), 3000);
            return;
          case '3':
            warn = warning.wrongData(this.state.getLang());
            singInBlock.append(warn);
            setTimeout(() => warn.remove(), 3000);
            return;
          case '4':
            window.location.reload();
            return;
          default:
            warn = warning.wrongOops(this.state.getLang());
            singInBlock.append(warn);
            setTimeout(() => warn.remove(), 3000);
            return;
        }
      });
    } else {
      const block = this.wnd.querySelector('.container__error-popup') as HTMLElement;
      const warning = new Warning().wrongData(this.state.getLang());
      block.append(warning);
      setTimeout(() => warning.remove(), 3000);
    }
  }

  private signUp(ev: Event): void {
    ev.stopPropagation();
    if (this.isValidLogin && this.isValidPass) {
      const login: string = (this.wnd.querySelector('.container__login-input') as HTMLInputElement).value;
      const pass: string = (this.wnd.querySelector('.container__pass-input') as HTMLInputElement).value;
      const errBlock: HTMLElement = this.wnd.querySelector('.container__error-popup') as HTMLElement;
      const register: Authorization = new Authorization();
      const warning: Warning = new Warning();
      register.signUp(login, pass).then((answer: string) => {
        let warn: HTMLSpanElement;
        switch (answer) {
          case '1':
            warn = warning.registeredYet(this.state.getLang());
            errBlock.append(warn);
            break;
          case '2':
          case '3':
            warn = warning.wrongOops(this.state.getLang());
            errBlock.append(warn);
            break;
          case '4':
            location.reload();
            return;
          default:
            warn = warning.wrongOops(this.state.getLang());
            errBlock.append(warn);
            break;
        }
        setTimeout(() => {
          warn.remove();
        }, 1500);
      });
    }
  }

  private toSignUp(ev: Event): void {
    ev.stopPropagation();
    const wndWrapper = this.wnd.querySelector('.container__in-wrapper') as HTMLElement;
    wndWrapper.remove();
    this.wndSignUp();
  }

  private toSignIn(ev: Event): void {
    ev.stopPropagation();
    const wndWrapper = this.wnd.querySelector('.container__up-wrapper') as HTMLElement;
    wndWrapper.remove();
    this.wndSignIn();
  }

  private exitAccount(ev: Event): void {
    ev.stopPropagation();
    this.state.setUser('');
    this.state.setToken('');
    this.state.setAuth(false);
    sessionStorage.clear();
    window.location.reload();
  }
}
