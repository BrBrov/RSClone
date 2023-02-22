import { nSongInPage, base } from '../../utils/constants';

class Base {
  private static queryUser = base + '/login';

  private static queryRandom = base + '/random';

  private static querySearch = base + '/search';

  private static queryStyle = base + '/style';

  private static queryOne = base + '/play';

  private static queryAddRate = base + '/rate';

  private async get(query: string): Promise<Array<SongData>> {
    const response: Response = await fetch(query, { method: 'GET' });
    const songs: Array<SongData> = await response.json();
    return songs;
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
    const song: SongData = await response.json();
    return song;
  }

  public async getPlayList() {
    const response: Response = await fetch(
      'http://localhost:8081/playlist?user=qqq&token=12196210851313013683231112176474456123',
      { method: 'GET' }
    );
    const result = await response.json();
    console.log(result.pls, result.pls.tracks);
    return result.pls.tracks;
  }

  public async addView(id: number) {
    await fetch(Base.queryAddRate + `?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(id),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export default Base;
