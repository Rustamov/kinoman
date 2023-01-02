import FilmCard from '../components/film-card';
import FilmDetails from '../components/film-details';
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


const renderFilm = (filmsListContainerElement, film) => {
  const showDetailsFilm = () => {
    render(document.body, DetailsFilmComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, onEscKeyDown);
    document.body.classList.add(`hide-overflow`);
  };

  const closeDetailsFilm = () => {
    remove(DetailsFilmComponent);

    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeDetailsFilm();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  const FilmComponent = new FilmCard(film);
  FilmComponent.setShowDetailsClickHandler(showDetailsFilm);

  const DetailsFilmComponent = new FilmDetails(film);
  DetailsFilmComponent.setCloseButtonHandler(closeDetailsFilm);

  render(filmsListContainerElement, FilmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmsListContainerElement, films) => {
  films.forEach((film) => {
    renderFilm(filmsListContainerElement, film);
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

    this._filmsEmpty = new FilmsEmpty();
    this._sortComponent = new Sort();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._topRatedFilms = new TopRatedFilms();
    this._mostCommentedFilms = new MostCommentedFilms();

  }

  render(films) {
    let showingFilms = films.slice(); //for saving oringinal <films> items order

    const renderShowMoreButton = () => {
      if (showingFilmsCount > showingFilms.length > 0) {
        return;
      }

      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

        renderFilms(filmsListContainerElement, showingFilms.slice(prevTasksCount, showingFilmsCount));

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

      renderFilms(filmsListContainerElement, showingFilms.slice(0, showingFilmsCount));

    });


    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    renderFilms(filmsListContainerElement, showingFilms.slice(0, showingFilmsCount));

    render(filmsListElement, this._showMoreButtonComponent);

    renderShowMoreButton();

    if (TOP_RATED_FILMS_COUNT > 0) {
      const topRatedFilmsComponent = this._topRatedFilms;
      render(container, topRatedFilmsComponent);

      const topRatedFilmsContainerElement = topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

      const topRatedFilms = generateFilms(TOP_RATED_FILMS_COUNT);
      renderFilms(topRatedFilmsContainerElement, topRatedFilms);
    }

    if (MOST_COMMENTED_FILMS_COUNT > 0) {
      render(container, this._mostCommentedFilms);

      const topMostCommentedFilmsContainerElement = this._mostCommentedFilms.getElement().querySelector(`.films-list__container`);

      const topMostCommentedFilms = generateFilms(MOST_COMMENTED_FILMS_COUNT);

      renderFilms(topMostCommentedFilmsContainerElement, topMostCommentedFilms);
    }

  };
};
