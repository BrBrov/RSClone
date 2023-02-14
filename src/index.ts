import './style.scss';
import './assets/svg/favicon.svg';
import Page from './components/page';
import Base from './components/base/base';
import Router from './components/router/router';

const base = new Base();
const router = new Router();
const page = new Page(base, router);
page.start();
