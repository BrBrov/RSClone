interface ParamCreateByTag {
  tag: string;
  class?: string;
  id?: string;
  inner?: string;
  parent?: HTMLElement;
}

export function createByTag(param: ParamCreateByTag): HTMLElement {
  const tmp = document.createElement(param.tag);
  if (param.class) tmp.className = param.class;
  if (param.id) tmp.id = param.id;
  if (param.inner) tmp.innerHTML = param.inner;
  if (param.parent) param.parent.appendChild(tmp);
  return tmp;
}

export const nSongInPage = 20;
export const base = 'http://127.0.0.1:8081';
// export const base = location.origin;

export const genres = [
  { key: 'pop', name: 'Popular', img: 'popular.jpg', bg1: 'rgb(175 175 39 / 71%)', bg2: 'yellow' },
  { key: 'rock', name: 'Rock', img: 'rock.jpg', bg1: '#7bb0a6', bg2: '#1dabb8' },
  { key: 'hip', name: 'Hip-hop', img: 'hip-hop.png', bg1: '#f29b34', bg2: '#ff7416' },
  { key: 'electronic', name: 'Electronic', img: 'electronic.png', bg1: '#777777', bg2: '#999999' },
  { key: 'dance', name: 'Dance', img: 'dance.png', bg1: '#2c82c9', bg2: '#83d6de' },
  { key: 'music', name: 'Lyric', img: 'lyric.jpg', bg1: '#7e3661', bg2: '#bb3658' },
  { key: 'house', name: 'House', img: 'house.png', bg1: '#a0b58d', bg2: '#8c7e51' },
];
