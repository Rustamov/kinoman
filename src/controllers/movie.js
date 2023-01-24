// import API from '../api';
import FilmCard from '../components/film-card';
import FilmDetails from '../components/film-details';
// import CommentsModel from '../models/comments';
import CommentModel from '../models/comment';
import MovieModel from '../models/movie';


// const commentsModel = new CommentsModel();
// const api = new API(`https://18.ecmascript.pages.academy/cinemaddict`, `Basic ghdhJLJLNJMgDSDadsada`);


import {RenderPosition, render, remove, replace} from '../utils/render';

export const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._comments = [];

    this._filmComponent = null;
    this._detailsFilmComponent = null;

    this._showDetailsFilm = this._showDetailsFilm.bind(this);
    this._closeDetailsFilm = this._closeDetailsFilm.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this.filmId = film.id;

    const oldFilmComponent = this._filmComponent;
    const oldDetailsFilmComponent = this._detailsFilmComponent;

    this._filmComponent = new FilmCard(film);
    this._detailsFilmComponent = new FilmDetails(film);

    this._filmComponent.setShowDetailsClickHandler(this._showDetailsFilm);
    this._detailsFilmComponent.setCloseButtonHandler(this._closeDetailsFilm);

    this._filmComponent.setAddWatchlistButtonClickHandler(() => {
      const newMovie = MovieModel.clone(film);
      newMovie.userDetails.isOnWatchlist = !newMovie.userDetails.isOnWatchlist;

      this._onDataChange(this, film, newMovie);
    });
    this._detailsFilmComponent.setAddWatchlistButtonClickHandler(() => {
      const newMovie = MovieModel.clone(film);
      newMovie.userDetails.isOnWatchlist = !newMovie.userDetails.isOnWatchlist;

      this._onDataChange(this, film, newMovie);
    });

    this._filmComponent.setMarkWatchedButtonClickHandler(() => {
      const newMovie = MovieModel.clone(film);
      newMovie.userDetails.isAlreadyWatched = !newMovie.userDetails.isAlreadyWatched;

      this._onDataChange(this, film, newMovie);
    });
    this._detailsFilmComponent.setMarkWatchedButtonClickHandler(() => {
      const newMovie = MovieModel.clone(film);
      newMovie.userDetails.isAlreadyWatched = !newMovie.userDetails.isAlreadyWatched;

      this._onDataChange(this, film, newMovie);
    });

    this._filmComponent.setFavoriteButtonClickHandler(() => {
      const newMovie = MovieModel.clone(film);
      newMovie.userDetails.isFavorite = !newMovie.userDetails.isFavorite;

      this._onDataChange(this, film, newMovie);
    });
    this._detailsFilmComponent.setFavoriteButtonClickHandler(() => {
      const newMovie = MovieModel.clone(film);
      newMovie.userDetails.isFavorite = !newMovie.userDetails.isFavorite;

      this._onDataChange(this, film, newMovie);
    });


    this._detailsFilmComponent.setCommentDeleteClickHandler((index) => {
      // const newMovie = MovieModel.clone(film);
      // newMovie.comments = [].concat(newMovie.comments.slice(0, index), newMovie.comments.slice(index + 1));

      // this._onDataChange(this, film, newMovie);
      const commentId = film.comments[index];

      // const newComments = CommentModel.clone(film.comments);
      // newComments = [].concat(newComments.slice(0, index), newComments.slice(index + 1));

      // api.deleteComment(commentId)
      //   .then((movieModel) => {

      //   });
      // this._onDataChange(this, film, Object.assign({}, film, {
      //   comments: [].concat(film.comments.slice(0, index), film.comments.slice(index + 1))
      // }));
    });

    this._detailsFilmComponent.setSubmitHandler(() => {
      const newComment = this._detailsFilmComponent.getData();
      console.log(newComment);

      this._onDataChange(this, film, Object.assign({}, film, {
        // comments: [].concat(film.comments.slice(), newComment),
        comments: [].concat(film.comments.slice(), newComment)
      }));
    });

    // api.getComments(film.id)
    //   .then((comments) => {
    //     this._comments = comments;
    //   });


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

  destroy() {
    remove(this._filmComponent);
    remove(this._detailsFilmComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _showDetailsFilm() {
    this._onViewChange();
    render(document.body, this._detailsFilmComponent, RenderPosition.BEFOREEND);
    console.log(commentsModel.getComments(this.filmId));

    // api.getComments(this.filmId)
    //   .then((comments) => {
    //     commentsModel.addComments(this.filmId, comments);

    //     console.log(commentsModel.getComments(this.filmId));
    //     //this._detailsFilmComponent.renderComments(commentsModel.getComments());
    //   });

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
