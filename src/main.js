import {createFilmsTemplate} from './components/films';
import {createFilmCardTemplate} from './components/film-card';
import {createFilmDetailsTemplate} from './components/film-details';
import {createFooterStatisticTemplate} from './components/footer-statistic';
import {createMenuTemplate} from './components/menu';
import {createShowMoreBtnTemplate} from './components/show-more-button';
import {createUserTitleTemplate} from './components/user-title';

import {generateFilms} from './mock/film';


const FILMS_COUNT = 15;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

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

const films = generateFilms(FILMS_COUNT);

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsListContainerElement = siteMainElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => {
  render(filmsListContainerElement, createFilmCardTemplate(film));
});

render(filmsListElement, createShowMoreBtnTemplate());
const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
    render(filmsListContainerElement, createFilmCardTemplate(film));
  });

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});


const topRatedFilmsListContainerElement = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[0];

const topRatedFilms = generateFilms(TOP_RATED_FILMS_COUNT);
topRatedFilms.forEach((film) => {
  render(topRatedFilmsListContainerElement, createFilmCardTemplate(film));
});

const mostCommentedFilmsListContainerElement = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[1];

const mostCommentedFilms = generateFilms(MOST_COMMENTED_FILMS_COUNT);
mostCommentedFilms.forEach((film) => {
  render(mostCommentedFilmsListContainerElement, createFilmCardTemplate(film));
});


const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFooterStatisticTemplate());

// render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);

