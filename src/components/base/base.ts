import { nSongInPage } from '../../utils/heap';

class Base {
  base: string;

  user_query: string;

  song_query: string;

  style_query: string;

  constructor() {
    this.base = 'http://127.0.0.1:8080';
    this.song_query = this.base + '/track';
    this.style_query = this.base + '/style';
    this.user_query = this.base + '/login';
  }

  getGenre = async (page = -1, limit = nSongInPage, genre = 'pop') => {
    let hvost = `?genre=${genre}`;
    if (page !== -1) hvost += `&page=${page}&limit=${limit}`;
    console.log(this.style_query + hvost);
    const response = await fetch(this.style_query + hvost, {
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
}
export default Base;
