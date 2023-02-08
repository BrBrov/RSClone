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
}
