import FilmCard from '../components/film-card';
import FilmDetails from '../components/film-details';

import {RenderPosition, render, remove, replace} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._detailsFilmComponent = null;

    this._showDetailsFilm = this._showDetailsFilm.bind(this);
    this._closeDetailsFilm = this._closeDetailsFilm.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {

    const oldFilmComponent = this._filmComponent;
    const oldDetailsFilmComponent = this._detailsFilmComponent;

    this._filmComponent = new FilmCard(film);
    this._detailsFilmComponent = new FilmDetails(film);

    this._filmComponent.setShowDetailsClickHandler(this._showDetailsFilm);
    this._detailsFilmComponent.setCloseButtonHandler(this._closeDetailsFilm);

    this._filmComponent.setAddWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isOnWatchlist: !film.isOnWatchlist
      }));
    });
    this._detailsFilmComponent.setAddWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isOnWatchlist: !film.isOnWatchlist
      }));
    });

    this._filmComponent.setMarkWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    });
    this._detailsFilmComponent.setMarkWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    });

    this._filmComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    });
    this._detailsFilmComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    });

    if (oldFilmComponent && oldDetailsFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._detailsFilmComponent, oldDetailsFilmComponent);
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetailsFilm();
    }
  }

  _showDetailsFilm() {
    this._onViewChange();
    render(document.body, this._detailsFilmComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.body.classList.add(`hide-overflow`);
    this._mode = Mode.POPUP;
  }

  _closeDetailsFilm() {
    remove(this._detailsFilmComponent);

    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeDetailsFilm();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
