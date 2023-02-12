import './connect-popup.scss';

export default class LoginPopUp {
  constructor() {
    this.poUp();
    this.logIn();
    this.sigUp();
    this.logOut();
  }

  private poUp(): void {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'connect-popup';
    // popup.className = 'connect-popup popup-section';
  }

  private logIn(): void {
    const logindiv: HTMLElement = document.createElement('div');
    logindiv.className = 'login-form';
    const i: HTMLElement = document.createElement('i');
    i.className = 'fas';
    logindiv.append(i);
    const h3: HTMLElement = document.createElement('h3');
    h3.innerText = 'Log In';
    logindiv.append(h3);

    const form: HTMLFormElement = document.createElement('form');
    form.action = '';

    const dive: HTMLElement = document.createElement('div');

    const labele: HTMLLabelElement = document.createElement('label');
    labele.htmlFor = '';
    labele.innerText = 'Email;';
    let inpute: HTMLInputElement = document.createElement('input');
    inpute.type = 'email';
    inpute.id = 'login-email';
    dive.append(labele, inpute);
    form.append(dive);

    const divp: HTMLElement = document.createElement('div');

    const labelp: HTMLLabelElement = document.createElement('label');
    labelp.htmlFor = 'signup-password';
    labelp.innerText = 'Password:';
    let inputp: HTMLInputElement = document.createElement('input');
    inputp.type = 'password';
    inputp.id = 'login-password';
    dive.append(labelp, inputp);
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

    logindiv.addEventListener('submit', (e) => {
      e.preventDefault();
      inpute = document.getElementById('login-email') as HTMLInputElement;
      inputp = document.getElementById('login-password') as HTMLInputElement;

      //TODO:
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
    });
  }

  private sigUp(): void {
    const signupdiv: HTMLElement = document.createElement('div');
    signupdiv.className = 'signup-form';
    const i: HTMLElement = document.createElement('i');
    i.className = 'fas';
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
    let inpute: HTMLInputElement = document.createElement('input');
    inpute.type = 'email';
    inpute.id = 'signup-email';
    dive.append(labele, inpute);
    form.append(dive);

    const divp: HTMLElement = document.createElement('div');

    const labelp: HTMLLabelElement = document.createElement('label');
    labelp.htmlFor = 'signup-password';
    labelp.innerText = 'Password:';
    let inputp: HTMLInputElement = document.createElement('input');
    inputp.type = 'password';
    inputp.id = 'signup-password';
    dive.append(labelp, inputp);
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

    signupdiv.addEventListener('submit', (e) => {
      e.preventDefault();
      inpute = document.getElementById('signup-email') as HTMLInputElement;
      inputp = document.getElementById('signup-password') as HTMLInputElement;

      //TODO:
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
    });
  }

  private logOut(): void {
    const logoutdiv: HTMLElement = document.createElement('div');
    logoutdiv.className = 'logout-form';
    const i: HTMLElement = document.createElement('i');
    i.className = 'fas';
    logoutdiv.append(i);

    const form: HTMLFormElement = document.createElement('form');
    form.action = '';

    const iform: HTMLElement = document.createElement('i');
    iform.className = 'fas';
    const button: HTMLButtonElement = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Log out';
    form.append(iform, button);

    logoutdiv.append(form);

    logoutdiv.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}
