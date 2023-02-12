import './connect-popup.scss';
// import State from '../../utils/state';
// import Login from '../login/login';
// import Login from '../page';

export default class LoginPopUp {
  public popupLogin: HTMLElement;

  public popupLogout: HTMLElement;

  public popupSignup: HTMLElement;

  constructor() {
    // this.connectPopup = this.poUp();
    this.popupSignup = this.signUp();
    this.popupLogout = this.logOut();
    this.popupListener();
    this.popupLogin = this.logIn();
    // this.Login = new Login();
  }

  // public getElems(): HTMLElement {
  //   loginBtn.getElems();
  // }

  // private poUp(): HTMLElement {
  //   const popup: HTMLElement = document.createElement('div');
  //   popup.className = 'connect-popup';
  //   return popup;
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
    // return logindiv;
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
    // return signupdiv;
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
    // return logoutdiv;
  }

  private popupListener() {
    // const popupBtn: HTMLElement = this.login.lquerySelector('.top__login-wrapper') as HTMLElement;
    // popupBtn.addEventListener('click', (e: Event) => {
    //   e.preventDefault();
    //   this.poUp.bind(this);
    // });
    // this.logindiv.addEventListener('submit', (e: Event) => {
    //   e.preventDefault();
    //   this.logIn.bind(this);
    // inpute = document.getElementById('login-email') as HTMLInputElement;
    // inputp = document.getElementById('login-password') as HTMLInputElement;
    // auth
    //   .signInWithEmailAndPassword(inpute, inputp)
    //   .then((cred) => {
    //     popup.style.transform = "translate(-50%, -50%) scale(0)";
    //   })
    //   .then(() => {
    //     alertMessage.lastElementChild.innerText = "You're Logged In!";
    //     openForm(alertMessage);
    //     connectPopup.style.transform = "translate(-50%, -50%) scale(1)";
    //   });
    // });
    // this.signupdiv.addEventListener('submit', (e: Event) => {
    //   e.preventDefault();
    //   this.sigUp.bind(this);
    //inpute = document.getElementById('signup-email') as HTMLInputElement;
    // inputp = document.getElementById('signup-password') as HTMLInputElement;
    // auth
    //   .signInWithEmailAndPassword(inpute, inputp)
    //   .then((cred) => {
    //     popup.style.transform = "translate(-50%, -50%) scale(0)";
    //   })
    //   .then(() => {
    //     alertMessage.lastElementChild.innerText = "You're Logged In!";
    // openForm(alertMessage);
    //     connectPopup.style.transform = "translate(-50%, -50%) scale(1)";
    //   });
    // });
    // this.logoutdiv.addEventListener('submit', (e: Event) => {
    //   e.preventDefault();
    //   this.logOut.bind(this);
    // });
  }
}
