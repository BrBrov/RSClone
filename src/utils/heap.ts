interface ParamCreateByTag {
  tag: string;
  class?: string;
  id?: string;
  inner?: string;
  parent?: HTMLElement;
}

export function createByTag(param: ParamCreateByTag) {
  const tmp = document.createElement(param.tag);
  if (param.class) tmp.className = param.class;
  if (param.id) tmp.id = param.id;
  if (param.inner) tmp.innerHTML = param.inner;
  if (param.parent) param.parent.appendChild(tmp);
  return tmp;
}

export const nSongInPage = 20;
