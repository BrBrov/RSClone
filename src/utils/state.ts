export default class State {
  private state: StateData;

  constructor() {
    const locState = localStorage.getItem('state');
    if (locState) {
      this.state = JSON.parse(locState);
      return;
    }
    let language = window.navigator.language.slice(0, 2);

    if (language !== 'ru') {
      language = 'en';
    }

    this.state = {
      lang: language,
      auth: false,
      token: '',
      user: '',
    };
    this.saveStorage();
  }

  private saveStorage(): void {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  public getLang(): string {
    return this.state.lang;
  }

  public setlang(lang: string): void {
    this.state.lang = lang;
    this.saveStorage();
  }

  public getToken(): string {
    return this.state.token;
  }

  public setToken(token: string): void {
    this.state.token = token;
    this.saveStorage();
  }

  public getUser(): string {
    return this.state.user;
  }

  public setUser(user: string): void {
    this.state.user = user;
    this.saveStorage();
  }

  public getAuth(): boolean {
    return this.state.auth;
  }

  public setAuth(bool: boolean): void {
    this.state.auth = bool;
    this.saveStorage();
  }
}
