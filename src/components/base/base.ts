import { nSongInPage, base } from '../../utils/constants';

class Base {
  private queryUser = base + '/login';

  private queryRandom = base + '/random';

  private querySearch = base + '/search';

  private queryStyle = base + '/style';

  private queryOne = base + '/play';

  private async get(query: string): Promise<Array<SongData>> {
    const response: Response = await fetch(query, { method: 'GET' });
    const songs: Array<SongData> = await response.json();
    return songs;
  }

  public getSearch = async (search = ''): Promise<Array<SongData>> => this.get(this.querySearch + `?string=${search}`);

  public getSet = async (limit = nSongInPage, page = 1): Promise<Array<SongData>> =>
    this.get(this.queryRandom + `?limit=${limit}&page=${page}`);

  public async getGenre(page = 1, limit = nSongInPage, genre = 'pop'): Promise<Array<SongData>> {
    const response: Response = await fetch(this.queryStyle + `?genre=${genre}&page=${page}&limit=${limit}`, {
      method: 'GET',
    });
    const result: { tracks: Array<SongData>; count: number } = await response.json();
    return result.tracks;
  }

  public async getOneSong(id = 1): Promise<SongData> {
    const response: Response = await fetch(this.queryOne + `?id=${id}`, { method: 'GET' });
    const song: SongData = await response.json();
    return song;
  }
}
export default Base;
