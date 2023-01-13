
import Films from './components/films';
import PageController from './controllers/films';
import FooterStatistic from './components/footer-statistic';
import FilterController from './controllers/filter';
import UserTitle from './components/user-title';
import StatisticsComponent from './components/statistics';

import MovieModel from './models/movies';

import {generateFilms} from './mock/film';
import {RenderPosition, render} from './utils/render';
import {MenuType} from './const';

const FILMS_COUNT = 15;

const films = generateFilms(FILMS_COUNT);
const movieModel = new MovieModel();
movieModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserTitle(), RenderPosition.BEFOREEND);

const filmsComponent = new Films();
const siteMainElement = document.querySelector(`.main`);

// render(siteMainElement, new Filter(), RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, movieModel);
filterController.render();

movieModel.setDataChangeHandler(() => {
  filterController.render();
});
movieModel.setFilterChangeHandler(() => {
  if (filterController.getActiveFilterType() === MenuType.STATS) {
    pageController.hide();
    statisticsComponent.show();
  } else if (!pageController.isVisible()) {
    pageController.show();
    statisticsComponent.hide();
  }
});

// render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsComponent, movieModel);

render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);
pageController.render(films);


const statisticsComponent = new StatisticsComponent(movieModel);
statisticsComponent.hide();
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, new FooterStatistic(), RenderPosition.BEFOREEND);


