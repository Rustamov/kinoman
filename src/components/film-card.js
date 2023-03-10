import AbstractComponent from '../components/abstract-component';
import {formatFilmDuration} from '../utils/common';

const createFilmCardTemplate = (film) => {
  const {
    comments,
    filmInfo,
    userDetails,

  } = film;

  const {
    actors,
    ageRating,
    alternativeTitle,
    description,
    director,
    genre,
    poster,
    release,
    runtime,
    title,
    totalRating,
    writers,

  } = filmInfo;

  const {
    releaseCountry,
    date,
  } = release;

  const {
    isOnWatchlist,
    isAlreadyWatched,
    watchingDate,
    isFavorite,
  } = userDetails;

  const year = date.getFullYear();

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${formatFilmDuration(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comment${comments.length > 1 ? `s` : ``}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isOnWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAlreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};


export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super(film);
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setShowDetailsClickHandler(handler) {
    const filmPosterEl = this.getElement().querySelector(`.film-card__poster`);
    const filmTitleEl = this.getElement().querySelector(`.film-card__title`);
    const filmCommentsEl = this.getElement().querySelector(`.film-card__comments`);

    filmPosterEl.addEventListener(`click`, () => {
      handler();
    });
    filmTitleEl.addEventListener(`click`, () => {
      handler();
    });
    filmCommentsEl.addEventListener(`click`, () => {
      handler();
    });
  }

  setAddWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }

  setMarkWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }

}
