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
    this.random_query = this.base + '/random';
    this.style_query = this.base + '/style';
    this.user_query = this.base + '/login';
    this.one_query = this.base + '/play';
  }

  /*getGenre = async (page = 1, limit = nSongInPage, genre = 'pop') =>
  fetch(this.style_query + `?genre=${genre}&page=${page}&limit=${limit}`, { method: 'GET' }).then((resp) => {
    console.log(...resp.headers);
    console.log(resp.headers.get('X-Total-Count'));
    return {
      items: resp.json(),
      cpunt: resp.headers.get('X-Total-Count'),
    };
  });*/

  getGenre = async (page = 1, limit = nSongInPage, genre = 'pop') => {
    const hvost = `?genre=${genre}&page=${page}&limit=${limit}`;

    const response = await fetch(this.style_query + hvost, { method: 'GET' });
    console.log(...response.headers);

    return {
      items: await response.json(),
      cpunt: response.headers.get('X-Total-Count'),
    };
  };

  getSet = async (limit = nSongInPage, page = 1) => {
    const hvost = `?limit=${limit}&page=${page}`;
    const response = await fetch(this.random_query + hvost, { method: 'GET' });
    return {
      items: await response.json(),
      cpunt: response.headers.get('X-Total-Count'),
    };
  };

  getOneSong = async (id = 1) => {
    const hvost = `?id=${id}`;
    const response = await fetch(this.one_query + hvost, { method: 'GET' });
    return {
      item: await response.json(),
      cpunt: response.headers.get('X-Total-Count'),
    };
  };
}
export default Base;
