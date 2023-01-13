// import MovieController, {Mode as MovieControllerMode} from './movie';

import MovieController from './movie';
import FilmsEmpty from '../components/films-empty';
import MostCommentedFilms from '../components/films-most-commented';
import TopRatedFilms from '../components/films-top-rated';
import ShowMoreButton from '../components/show-more-button';
import Sort, {SortType} from '../components/sort';


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

const getSortedFilms = (films, sortType, from, to) => {
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

    case SortType.BY_COMMENTS:
      sortedFilms = showingFilms.sort((a, b) => a.comments.length - b.comments.length);
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container, movieModel) {
    this._container = container;
    this._movieModel = movieModel;
    this._showedMovieControllers = [];
    this._topRatedMovieControllers = [];
    this._mostCommentedMovieControllers = [];
    this._topRatedMovieControllers = [];
    this._mostCommentedMovieControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._filmsEmpty = new FilmsEmpty();
    this._sortComponent = new Sort();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._topRatedFilmsComponent = new TopRatedFilms();
    this._mostCommentedFilmsComponent = new MostCommentedFilms();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._movieModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._movieModel.getFilms();

    let showingFilms = films.slice(); // for saving oringinal <films> items order

    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    if (showingFilms.length === 0) {
      filmsListElement.replaceChildren(this._filmsEmpty.getElement());
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), 0, this._showingFilmsCount);

    this._renderFilms(sortedFilms);

    this._renderShowMoreButton();

    if (TOP_RATED_FILMS_COUNT > 0) {
      render(container, this._topRatedFilmsComponent);

      const topRatedFilmsContainerElement = this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

      const topRatedFilms = getSortedFilms(films, SortType.BY_RATING, 0, this._movieModel.getFilmsAll().length)
                              .reverse()
                              .slice(0, 2);

      this._topRatedMovieControllers = renderFilms(topRatedFilmsContainerElement, topRatedFilms, this._onDataChange, this._onViewChange);
    }

    if (MOST_COMMENTED_FILMS_COUNT > 0) {
      render(container, this._mostCommentedFilmsComponent);

      const mostCommentedFilmsContainerElement = this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

      const topMostCommentedFilms = getSortedFilms(films, SortType.BY_COMMENTS, 0, this._movieModel.getFilmsAll().length)
                                      .reverse()
                                      .slice(0, 2);

      this._mostCommentedMovieControllers = renderFilms(mostCommentedFilmsContainerElement, topMostCommentedFilms, this._onDataChange, this._onViewChange);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

    const sortedFilms = getSortedFilms(this._movieModel.getFilms(), sortType, 0, this._showingFilmsCount);

    this._removeFilms();
    this._renderFilms(sortedFilms);
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._movieModel.getFilms().length) {
      return;
    }
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list`);

    render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _renderFilms(films) {
    const filmsListContainerElement = this._container.getElement().querySelector(`.films-list__container`);

    const showingMovies = renderFilms(filmsListContainerElement, films, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(showingMovies);

    this._showingFilmsCount = this._showedMovieControllers.length;
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._movieModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _removeFilms() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _onShowMoreButtonClick() {
    const films = this._movieModel.getFilms();
    const filmsListContainerElement = this._container.getElement().querySelector(`.films-list__container`);

    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
    const moreMovies = renderFilms(filmsListContainerElement, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(moreMovies);

    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    console.log(movieController, oldData, newData);

    if (newData === null) {
      taskController.destroy();
      this._updateTasks(this._showingTasksCount);
    } else {
      const isSuccess = this._movieModel.updateFilm(oldData.id, newData);
      if (isSuccess) {
        const allMovieControllers = [].concat(this._showedMovieControllers, this._topRatedMovieControllers, this._mostCommentedMovieControllers)
                                      .slice();

        allMovieControllers.forEach((controller) => {
          if (controller.filmId === newData.id) {
            controller.render(newData);
          }
        });
      }
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
  }

  hide() {
    this._container.hide();
    this._sortComponent.hide();
  }

  show() {
    this._container.show();
    this._sortComponent.setSortType(SortType.DEFAULT);
    this._sortComponent.show();
  }

  isVisible() {
    return !this._container.getElement().classList.contains(`visually-hidden`);
  }
}
