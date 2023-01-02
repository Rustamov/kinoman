
import Films from './components/films';
import PageController from './controllers/films';
import FooterStatistic from './components/footer-statistic';
import Menu from './components/menu';
import UserTitle from './components/user-title';

import {generateFilms} from './mock/film';
import {RenderPosition, render} from './utils/render';

const FILMS_COUNT = 15;

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserTitle(), RenderPosition.BEFOREEND);

const filmsComponent = new Films();
const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, new Menu(), RenderPosition.BEFOREEND);


render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

const films = generateFilms(FILMS_COUNT);

const pageController = new PageController(filmsComponent);

render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);
pageController.render(films);

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, new FooterStatistic(), RenderPosition.BEFOREEND);


