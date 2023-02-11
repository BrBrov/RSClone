// import SongData from '../../global';

export default class ApiControls {
  private static url = 'https://backend.com/api'; // backend adress?

  public static async getOnTrack(track: number): Promise<void | Array<SongData>> {
    try {
      const response = await fetch(`${ApiControls.url}/play?id=${track}`, {
        method: 'GET',
      });
      if (response.ok) {
        return (await response.json()) as Array<SongData>;
      }
    } catch (err) {
      throw err;
    }
  }

  public static async getTrackLimit(limit: number, page: number): Promise<Array<SongData> | undefined> {
    try {
      const response = await fetch(`${ApiControls.url}/tracks?limit=${limit}&page=${page}`, {
        method: 'GET',
      });
      if (response.ok) {
        return (await response.json()) as Array<SongData>;
      }
    } catch (err) {
      throw err;
    }
  }

  public static async getRandomTrack(randlimit: number): Promise<Array<SongData> | undefined> {
    try {
      const response = await fetch(`${ApiControls.url}/random?limit=${randlimit}`, {
        method: 'GET',
      });
      if (response.ok) {
        return (await response.json()) as Array<SongData>;
      }
    } catch (err) {
      throw err;
    }
  }

  public static async getSearchTrack(search: number): Promise<Array<SongData> | undefined> {
    try {
      const response = await fetch(`${ApiControls.url}/search?string=${search}`, {
        method: 'GET',
      });
      if (response.ok) {
        return (await response.json()) as Array<SongData>;
      }
    } catch (err) {
      throw err;
    }
  }
}
