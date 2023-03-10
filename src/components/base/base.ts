import { base, nSongInPage } from '../../utils/constants';
import State from '../../utils/state';

class Base {
  private static queryRandom = base + '/random';

  private static querySearch = base + '/search';

  private static queryStyle = base + '/style';

  private static queryOne = base + '/play';

  private static queryAddRate = base + '/rate';

  private static queryPlaylist = base + '/playlist';

  public state: State;

  constructor() {
    this.state = new State();
  }

  private async get(query: string): Promise<Array<SongData>> {
    const response: Response = await fetch(query, { method: 'GET' });
    return response.json();
  }

  public getSearch = async (search = ''): Promise<Array<SongData>> => this.get(Base.querySearch + `?string=${search}`);

  public getSet = async (limit = nSongInPage, page = 1): Promise<Array<SongData>> =>
    this.get(Base.queryRandom + `?limit=${limit}&page=${page}`);

  public async getGenre(page = 1, limit = nSongInPage, genre = 'pop'): Promise<Array<SongData>> {
    const response: Response = await fetch(Base.queryStyle + `?genre=${genre}&page=${page}&limit=${limit}`, {
      method: 'GET',
    });
    const result: { tracks: Array<SongData>; count: number } = await response.json();
    return result.tracks;
  }

  public async getOneSong(id = 1): Promise<SongData> {
    const response: Response = await fetch(Base.queryOne + `?id=${id}`, { method: 'GET' });
    return response.json();
  }

  public async getPlayList(login: string, token: string): Promise<PlsData> {
    const response: Response = await fetch(Base.queryPlaylist + `?user=${login}&token=${token}`, { method: 'GET' });
    const result: Playlist = await response.json();
    sessionStorage.setItem('pls', JSON.stringify(result.pls));
    return result.pls;
  }

  public async addSongToPlayList(login: string, token: string, id: number) {
    const response: Response = await fetch(Base.queryPlaylist + `?user=${login}&token=${token}`, {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }

  public async removeSongFromPlayList(login: string, token: string, id: number) {
    const response: Response = await fetch(Base.queryPlaylist + `?user=${login}&token=${token}`, {
      method: 'PUT',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }

  public async addView(id: number) {
    await fetch(Base.queryAddRate + `?id=${id}`, {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export default Base;
