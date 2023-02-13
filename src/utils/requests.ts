export default class Requests {
  //TODO: replace host address before deploy
  async getRandomSongs(): Promise<Array<SongData>> {
    const uri = new URL('http://127.0.0.1:8081/random?limit=10');
    const request = await fetch(uri, { method: 'GET' });
    const resp = await request.json();
    return resp;
  }
}
