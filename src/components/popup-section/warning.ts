export default class Warning {
  public wrongData(lang: string): HTMLElement {
    const title = lang === 'en' ? 'Wrong password or login!' : 'Введены неверные данные!';
    return this.create(title);
  }

  public wrongOops(lang: string): HTMLElement {
    const title: string = lang === 'en' ? 'Something went wrong' : 'Что-то пошло не так';
    return this.create(title);
  }

  public alreadyRegistered(lang: string): HTMLElement {
    const title: string = lang === 'en' ? 'Already registered' : 'Уже зарегестрирован';
    return this.create(title);
  }

  public unregistered(lang: string): HTMLElement {
    const title: string = lang === 'en' ? 'Unregistered' : 'Незарегестрирован';
    return this.create(title);
  }

  public registeredYet(lang: string): HTMLElement {
    const title: string = lang === 'en' ? 'Account already exists' : 'Аккаунт уже сущетсвует';
    return this.create(title);
  }

  private create(message: string): HTMLSpanElement {
    const warning: HTMLSpanElement = document.createElement('span');
    warning.className = 'container__warning';
    warning.textContent = message;

    return warning;
  }
}
