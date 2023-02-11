export {};

declare global {
  interface SongData {
    id: number;
    artist: string;
    title: string;
    genre: string;
    file: string;
    logo: string;
  }

  interface PlayerViewData {
    artist: string;
    title: string;
    duration: number;
    logo: string;
  }

  interface StateData {
    lang: string;
    auth: boolean;
    token: string;
    user: string;
  }
}
