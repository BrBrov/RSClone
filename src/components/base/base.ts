import { nSongInPage } from '../../utils/heap';

class Base {
  base: string;

  user_query: string;

  random_query: string;

  style_query: string;

  one_query: string;

  constructor() {
    this.base = 'http://127.0.0.1:8081';
    //this.base = 'https://rs-clone-tan.vercel.app';
    this.random_query = this.base + '/tracks';
    this.style_query = this.base + '/style';
    this.user_query = this.base + '/login';
    this.one_query = this.base + '/play';
  }

  getGenre = async (page = 1, limit = nSongInPage, genre = 'pop') => {
    const hvost = `?genre=${genre}&page=${page}&limit=${limit}`;
    const uri = new URL(this.style_query + hvost);
    const response = await fetch(uri, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        //'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    return {
      items: await response.json(),
      cpunt: response.headers.get('X-Total-Count'),
    };
  };

  getSet = async (limit = nSongInPage, page = 1) => {
    const hvost = `?limit=${limit}&page=${page}`;
    const response = await fetch(this.random_query + hvost, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    return {
      items: await response.json(),
      cpunt: response.headers.get('X-Total-Count'),
    };
  };

  getOneSong = async (id = 1) => {
    const hvost = `?id=${id}`;
    const response = await fetch(this.one_query + hvost, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return {
      item: await response.json(),
      cpunt: response.headers.get('X-Total-Count'),
    };
  };
}
export default Base;
