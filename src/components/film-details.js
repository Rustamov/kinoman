import {formatReleaseDate, formatFilmDuration} from "../utils/common";
import AbstractSmartComponent from "../components/abstract-smart-component";
import moment from "moment/moment";


const makeCommentId = () => {
  let count = 6000;

  return () => {
    return ++count;
  };
};

const generateCommentId = makeCommentId();

const createGenresMarkup = (genres) => {
  return genres
    .map((genre) => {
      return (
        `<span class="film-details__genre">${genre}</span>`
      );
    })
    .join(`\n`);
};

const createCommentsMarkup = (comments) => {

  return comments
    .map((comment) => {
      const date = moment(comment.date).startOf(`day`).fromNow();

      return (
        `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
      );
    })
    .join(`\n`);
};

const parseFormData = (formData) => {
  const emotion = formData.get(`comment-emoji`) !== null
    ? `/images/emoji/${formData.get(`comment-emoji`)}.png`
    : `./images/emoji/sleeping.png`;

  return {
    author: `John Doe`,
    emotion,
    message: formData.get(`comment`),
    date: new Date(),
    id: generateCommentId,
  };
};

const createFilmDetailsTemplate = (film, options = {}) => {
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

  const {
    newCommentEmoji,
    newCommentText
  } = options;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">

              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatReleaseDate(date)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatFilmDuration(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${genre.length > 1 ? `s` : ``}</td>
                  <td class="film-details__cell">
                    ${createGenresMarkup(genre)}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isOnWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${createCommentsMarkup(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${newCommentEmoji ? `<img src="./images/emoji/${newCommentEmoji}.png" width="70" height="70" alt="emoji">` : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentText ? `${newCommentText}` : ``}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${newCommentEmoji === `smile` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${newCommentEmoji === `sleeping` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${newCommentEmoji === `puke` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${newCommentEmoji === `angry` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};


export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super(film);
    this._film = film;

    this._closeButtonHandler = null;
    this._addWatchlistButtonClickHandler = null;
    this._markWatchedButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
    this._commentDeleteClickHandler = null;
    this._submitHandler = null;

    this._newCommentEmoji = null;
    this._newCommentText = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      newCommentEmoji: this._newCommentEmoji,
      newCommentText: this._newCommentText,
    });
  }

  setCloseButtonHandler(handler) {
    const detailsFilmCloseButtonEl = this.getElement().querySelector(`.film-details__close-btn`);

    detailsFilmCloseButtonEl.addEventListener(`click`, () => {
      handler();
    });

    this._closeButtonHandler = handler;
  }

  setAddWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });

    this._addWatchlistButtonClickHandler = handler;
  }

  setMarkWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });

    this._markWatchedButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });

    this._favoriteButtonClickHandler = handler;
  }

  setCommentDeleteClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((button, index) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler(index);
      });
    });

    this._commentDeleteClickHandler = handler;
  }

  getData() {
    const form = this.getElement().querySelector(`form`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setSubmitHandler(handler) {
    // this.getElement().querySelector(`form`)
    //   .addEventListener(`submit`, handler);

    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, function(e) {
        if (!(e.keyCode === 13 && (e.metaKey || e.ctrlKey))) {
          return;
        }

        handler();
      });

    this._submitHandler = handler;
  }

  recoveryListeners() {
    this.setCloseButtonHandler(this._closeButtonHandler);
    this.setAddWatchlistButtonClickHandler(this._addWatchlistButtonClickHandler);
    this.setMarkWatchedButtonClickHandler(this._markWatchedButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setCommentDeleteClickHandler(this._commentDeleteClickHandler);
    this.setSubmitHandler(this._submitHandler);

    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.film-details__emoji-item`)
      .forEach((input) => {
        input.addEventListener(`change`, () => {
          this._newCommentEmoji = input.value;

          this.rerender();
        });
      });

    element.querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, (evt) => {
        this._newCommentText = evt.target.value;
      });
  }
}
