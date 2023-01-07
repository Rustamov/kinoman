import MovieController from './movie';
import FilmsEmpty from '../components/films-empty';
import MostCommentedFilms from '../components/films-most-commented';
import TopRatedFilms from '../components/films-top-rated';
import ShowMoreButton from '../components/show-more-button';
import Sort from '../components/sort';
import {SortType} from '../components/sort';


import {generateFilms} from '../mock/film';

import {RenderPosition, render, remove} from '../utils/render';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

const renderFilms = (filmsListContainerElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsListContainerElement, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
  });
};

const getSortedFilms = (films, sortType) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
    case SortType.BY_DATE:
      sortedFilms = showingFilms.sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case SortType.BY_RATING:
      sortedFilms = showingFilms.sort((a, b) => a.rating - b.rating);
      break;
  }

  return sortedFilms;
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._showedMovieControllers = [];
    this._topRatedMovieControllers = [];
    this._mostCommentedMovieControllers = [];

    this._filmsEmpty = new FilmsEmpty();
    this._sortComponent = new Sort();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._topRatedFilms = new TopRatedFilms();
    this._mostCommentedFilms = new MostCommentedFilms();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(films) {
    this._films = films;

    let showingFilms = this._films.slice(); // for saving oringinal <films> items order

    const renderShowMoreButton = () => {
      if (showingFilmsCount > showingFilms.length > 0) {
        return;
      }

      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

        const moreMovies = renderFilms(filmsListContainerElement, showingFilms.slice(prevTasksCount, showingFilmsCount), this._onDataChange, this._onViewChange);
        this._showedMovieControllers = this._showedMovieControllers.concat(moreMovies);

        if (showingFilmsCount >= showingFilms.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    if (showingFilms.length === 0) {
      filmsListElement.replaceChildren(this._filmsEmpty.getElement());
      return;
    }


    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilms = getSortedFilms(films, sortType);

      filmsListContainerElement.innerHTML = ``;

      const sortedMovies = renderFilms(filmsListContainerElement, showingFilms.slice(0, showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedMovieControllers = [].concat(sortedMovies, this._topRatedMovieControllers, this._mostCommentedMovieControllers);
    });


    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    const showingMovies = renderFilms(filmsListContainerElement, showingFilms.slice(0, showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(showingMovies);


    render(filmsListElement, this._showMoreButtonComponent);

    renderShowMoreButton();

    if (TOP_RATED_FILMS_COUNT > 0) {
      const topRatedFilmsComponent = this._topRatedFilms;
      render(container, topRatedFilmsComponent);

      const topRatedFilmsContainerElement = topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

      const topRatedFilms = generateFilms(TOP_RATED_FILMS_COUNT);
      this._films = this._films.concat(this._topRatedMovieControllers);

      this._topRatedMovieControllers = renderFilms(topRatedFilmsContainerElement, topRatedFilms, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(this._topRatedMovieControllers);
    }

    if (MOST_COMMENTED_FILMS_COUNT > 0) {
      render(container, this._mostCommentedFilms);

      const topMostCommentedFilmsContainerElement = this._mostCommentedFilms.getElement().querySelector(`.films-list__container`);

      const topMostCommentedFilms = generateFilms(MOST_COMMENTED_FILMS_COUNT);
      this._films = this._films.concat(topMostCommentedFilms);

      this._mostCommentedMovieControllers = renderFilms(topMostCommentedFilmsContainerElement, topMostCommentedFilms, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(this._mostCommentedMovieControllers);

    }

  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }
}
