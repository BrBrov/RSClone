import './card.scss';
import Page from '../page';
export default class Card {
    card: HTMLElement;
    playSong: (a: number) => void;
    page: Page;
    constructor(data: SongData, page: Page);
    private createCard;
    private addListeners;
    private onFocus;
    private onBlur;
}
//# sourceMappingURL=card.d.ts.map