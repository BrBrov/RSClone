import State from './state';

export default class Authorization {
  private readonly origin: string;

  constructor() {
    this.origin = 'http://localhost:8081';
  }

  public async registration(login: string, pass: string): Promise<string> {
    const hash = await this.getHash(pass);
    const idHash = await this.getHash(login);

    let uri: URL = new URL('http://localhost:8081/login');

    let req: Response = await fetch(uri, { method: 'GET', mode: 'cors' });
    const resp: JsonWebKey = await req.json();

    const iv: Uint8Array = window.crypto.getRandomValues(new Uint8Array(16));

    const key: CryptoKey = await this.importKey(resp);

    if (!hash || !idHash) {
      return '5';
    }

    const hashChif: ArrayBuffer | null = await this.encrypt(hash, key, iv);

    if (!hashChif) {
      return '5';
    }

    const body: string = JSON.stringify({
      pass: new Uint8Array(hashChif).toString(),
      id: new Uint8Array(idHash).toString(),
      login: login,
    });

    uri = new URL('http://localhost:8081/login?mode=register');

    req = await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: `Register ${iv}`,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: body,
    });

    const reg: RegisterResponseData = await req.json();
    if (!reg) {
      return '5';
    }

    switch (reg.register) {
      case 'none':
        return '1';
      case 'Internal db error!':
        return '2';
      case 'Cannot create apiKey!':
        return '3';
      default:
        const tokenUintArr: Uint8Array = this.toUint8Array(reg.register.split(','));

        const token: ArrayBuffer | null = await this.decript(tokenUintArr, key, iv);

        if (!token) {
          return '5';
        }

        const state = new State();
        state.setToken(new Uint8Array(token).join(''));
        state.setUser(`${reg.user}`);
        state.setAuth(true);
        return '4';
    }
  }

  public async logIn(login: string, pass: string): Promise<string> {
    const hash = (await this.getHash(pass)) as ArrayBuffer;
    const idHash = (await this.getHash(login)) as ArrayBuffer;

    let uri: URL = new URL('http://localhost:8081/auth');

    let req: Response = await fetch(uri, { method: 'GET', mode: 'cors' });
    const resp: JsonWebKey = await req.json();

    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    const key: CryptoKey = await this.importKey(resp);

    const hashChif = (await this.encrypt(hash, key, iv)) as ArrayBuffer;
    const idHashChif = (await this.encrypt(idHash, key, iv)) as ArrayBuffer;

    uri = new URL('http://localhost:8081/auth?mode=enter');

    req = await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: `Login ${iv}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: new Uint8Array(hashChif).toString(),
        id: new Uint8Array(idHashChif).toString(),
      }),
    });

    const reg = await req.json();

    const tokenChiff: string[] = reg.token.split(',');

    switch (reg.token) {
      case 'Wrong request!':
        return '1';
      case 'Unregistered!':
        return '2';
      case 'Wrong passord!':
        return '3';
      default:
        const tokenUintArr: Uint8Array = this.toUint8Array(tokenChiff);
        const tokenBuff: ArrayBuffer | null = await this.decript(tokenUintArr, key, iv);

        if (!tokenBuff) {
          return '5';
        }
        const token: string = new Uint8Array(tokenBuff).join('');

        const state = new State();
        state.setToken(`${token}`);
        state.setUser(reg.login);
        state.setAuth(true);
        return '4';
    }
  }

  private toArrBuffer(str: string): ArrayBuffer {
    const buf: ArrayBuffer = new ArrayBuffer(str.length * 2);
    const buf8Arr: Uint8Array = new Uint8Array(buf);
    for (let index = 0; index < str.length; index++) {
      buf8Arr[index] = str.charCodeAt(index);
    }
    return buf;
  }

  private async importKey(key: JsonWebKey): Promise<CryptoKey> {
    return window.crypto.subtle.importKey('jwk', key, 'AES-CBC', true, ['encrypt', 'decrypt']);
  }

  private async getHash(str: string): Promise<ArrayBufferLike | null> {
    const arrBuff: ArrayBuffer = this.toArrBuffer(str);
    const hash: ArrayBuffer = await crypto.subtle.digest('SHA-256', arrBuff);
    return hash ? hash : null;
  }

  private async encrypt(data: ArrayBuffer, key: CryptoKey, subKey: Uint8Array): Promise<ArrayBufferLike | null> {
    const hashChif: ArrayBuffer = await window.crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: subKey,
      },
      key,
      data
    );

    return hashChif ? hashChif : null;
  }

  private async decript(data: Uint8Array, key: CryptoKey, subKey: Uint8Array): Promise<ArrayBufferLike | null> {
    const decData: ArrayBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: subKey,
      },
      key,
      data
    );

    return decData ? decData : null;
  }

  private toUint8Array(arr: string[]): Uint8Array {
    const uintArr: Uint8Array = new Uint8Array(arr.length);
    arr.forEach((item: string, index: number) => {
      uintArr[index] = Number(item);
    });
    return uintArr;
  }
}
