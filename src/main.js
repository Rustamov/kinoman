import {createUserTitleTemplate} from './components/user-title';

import {createMenuTemplate} from './components/menu';

import {createFilmsTemplate} from './components/films';
import {createFilmCardTemplate} from './components/film-card';

import {createFilmDetailsTemplate} from './components/film-details';

import {createShowMoreBtnTemplate} from './components/show-more-button';

import {createFooterStatisticTemplate} from './components/footer-statistic';

const FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserTitleTemplate());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMenuTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsListContainerElement = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}
render(filmsListElement, createShowMoreBtnTemplate());


const topRatedFilmsListContainerElement = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[0];
for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
  render(topRatedFilmsListContainerElement, createFilmCardTemplate());
}

const mostCommentedFilmsListContainerElement = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[1];
for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
  render(mostCommentedFilmsListContainerElement, createFilmCardTemplate());
}


const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFooterStatisticTemplate());


