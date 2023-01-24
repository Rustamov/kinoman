
import API from './api';
import Films from './components/films';
import PageController from './controllers/films';
import FooterStatistic from './components/footer-statistic';
import FilterController from './controllers/filter';
import UserTitle from './components/user-title';
import StatisticsComponent from './components/statistics';

import MovieModel from './models/movies';
import CommentsModel from './models/comments';
import {RenderPosition, render} from './utils/render';
import {MenuType} from './const';

const api = new API(`https://18.ecmascript.pages.academy/cinemaddict`, `Basic ghdhJLJLNJMgDSDadsada`);
const movieModel = new MovieModel();
const commentsModel = new CommentsModel();

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserTitle(), RenderPosition.BEFOREEND);

const filmsComponent = new Films();
const siteMainElement = document.querySelector(`.main`);

// render(siteMainElement, new Filter(), RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, movieModel, commentsModel);
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

const pageController = new PageController(filmsComponent, api, movieModel, commentsModel);

render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);


const statisticsComponent = new StatisticsComponent(movieModel);
statisticsComponent.hide();
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, new FooterStatistic(), RenderPosition.BEFOREEND);


api.getFilms()
  .then((films) => {
    movieModel.setFilms(films);

    // console.log(movieModel.getFilmsAll());
    // filterController.render();
    pageController.render();

    movieModel.getFilmsAll().forEach((movie) => {
      api.getComments(movie.id)
      .then((comments) => {
        commentsModel.addComments(movie.id, comments);

        // console.log(commentsModel);

        });
    });

  });
