import './style.scss';
import './assets/svg/favicon.svg';
import Page from './components/page';
import Base from './components/base/base';

const base = new Base();
const page = new Page(base);
page.start();
