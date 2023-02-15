import './connect-popup.scss';
// import State from '../../utils/state';
// import Login from '../page';

export default class LoginPopUp {
  public popupLogin: HTMLElement;

  public popupLogout: HTMLElement;

  public popupSignup: HTMLElement;

  // public login: HTMLElement;

  constructor() {
    this.popupSignup = this.signUp();
    this.popupLogout = this.logOut();
    this.popupListener();
    this.popupLogin = this.logIn();
    // this.login = new Login();
  }

  // public getElems(): HTMLElement {
  //   return  this.login.getElems();
  // }

  private logIn(): HTMLElement {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'connect-popup';

    const logindiv: HTMLElement = document.createElement('div');
    logindiv.className = 'login-form popup-section';
    const i: HTMLElement = document.createElement('i');
    i.className = 'fas fa-times';
    logindiv.append(i);
    const h3: HTMLElement = document.createElement('h3');
    h3.innerText = 'Log In';
    logindiv.append(h3);

    const form: HTMLFormElement = document.createElement('form');
    form.action = '';

    const dive: HTMLElement = document.createElement('div');

    const labele: HTMLLabelElement = document.createElement('label');
    labele.htmlFor = '';
    labele.innerText = 'Email:';
    const inpute: HTMLInputElement = document.createElement('input');
    inpute.type = 'email';
    inpute.id = 'login-email';
    dive.append(labele, inpute);
    form.append(dive);

    const divp: HTMLElement = document.createElement('div');

    const labelp: HTMLLabelElement = document.createElement('label');
    labelp.htmlFor = 'signup-password';
    labelp.innerText = 'Password:';
    const inputp: HTMLInputElement = document.createElement('input');
    inputp.type = 'password';
    inputp.id = 'login-password';
    divp.append(labelp, inputp);
    form.append(divp);

    const diva: HTMLElement = document.createElement('div');

    const a: HTMLAnchorElement = document.createElement('a');
    a.href = '#';
    a.id = 'signup-link';
    a.innerText = 'or Sign up';
    const button: HTMLButtonElement = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Log in';
    diva.append(a, button);
    form.append(diva);

    logindiv.append(form);
    popup.append(logindiv);
    return popup;
  }

  private signUp(): HTMLElement {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'connect-popup';

    const signupdiv: HTMLElement = document.createElement('div');
    signupdiv.className = 'signup-form popup-section';
    const i: HTMLElement = document.createElement('i');
    i.className = 'fas fa-times';
    signupdiv.append(i);
    const h3: HTMLElement = document.createElement('h3');
    h3.innerText = 'Sign Up';
    signupdiv.append(h3);

    const form: HTMLFormElement = document.createElement('form');
    form.action = '';

    const dive: HTMLElement = document.createElement('div');

    const labele: HTMLLabelElement = document.createElement('label');
    labele.htmlFor = '';
    labele.innerText = 'Email;';
    const inpute: HTMLInputElement = document.createElement('input');
    inpute.type = 'email';
    inpute.id = 'signup-email';
    dive.append(labele, inpute);
    form.append(dive);

    const divp: HTMLElement = document.createElement('div');

    const labelp: HTMLLabelElement = document.createElement('label');
    labelp.htmlFor = 'signup-password';
    labelp.innerText = 'Password:';
    const inputp: HTMLInputElement = document.createElement('input');
    inputp.type = 'password';
    inputp.id = 'signup-password';
    divp.append(labelp, inputp);
    form.append(divp);

    const diva: HTMLElement = document.createElement('div');

    const a: HTMLAnchorElement = document.createElement('a');
    a.href = '#';
    a.id = 'login-link';
    a.innerText = 'or Log in';
    const button: HTMLButtonElement = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Sign up';
    diva.append(a, button);
    form.append(diva);

    signupdiv.append(form);
    popup.append(signupdiv);
    return popup;
  }

  private logOut(): HTMLElement {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'connect-popup';

    const logoutdiv: HTMLElement = document.createElement('div');
    logoutdiv.className = 'logout-form popup-section';
    const i: HTMLElement = document.createElement('i');
    i.className = 'fas fa-times';
    logoutdiv.append(i);

    const form: HTMLFormElement = document.createElement('form');
    form.action = '';

    const iform: HTMLElement = document.createElement('i');
    iform.className = 'fas fa-times';
    const button: HTMLButtonElement = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Log out';
    form.append(iform, button);

    logoutdiv.append(form);
    popup.append(logoutdiv);
    return popup;
  }

  private popupListener() {
    // const popupBtn: HTMLElement = this.popupLogin.lquerySelector('.top__login-wrapper') as HTMLElement;
    // popupBtn.addEventListener('click', (e: Event) => {
    // e.preventDefault();
    // this.logIn.bind(this);
    // });
  }
}
