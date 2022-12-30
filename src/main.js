import FilmCard from './components/film-card';
import FilmDetails from './components/film-details';
import FilmsEmpty from './components/films-empty';
import MostCommentedFilms from './components/films-most-commented';
import TopRatedFilms from './components/films-top-rated';
import Films from './components/films';
import FooterStatistic from './components/footer-statistic';
import Menu from './components/menu';
import ShowMoreBtn from './components/show-more-button';
import UserTitle from './components/user-title';

import {generateFilms} from './mock/film';

import {RenderPosition, render} from './utils';


const FILMS_COUNT = 15;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;


const renderFilm = (filmsListContainerElement, film) => {
  const showDetailsFilm = () => {
    document.body.appendChild(DetailsFilmComponent.getElement());
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closeDetailsFilm = () => {
    document.body.removeChild(DetailsFilmComponent.getElement());
    document.body.classList.remove(`hide-overflow`);
    DetailsFilmComponent.removeElement();
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
  const filmPosterEl = FilmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitleEl = FilmComponent.getElement().querySelector(`.film-card__title`);
  const filmCommentsEl = FilmComponent.getElement().querySelector(`.film-card__comments`);

  filmPosterEl.addEventListener(`click`, () => {
    showDetailsFilm();
  });
  filmTitleEl.addEventListener(`click`, () => {
    showDetailsFilm();
  });
  filmCommentsEl.addEventListener(`click`, () => {
    showDetailsFilm();
  });


  const DetailsFilmComponent = new FilmDetails(film);
  const detailsFilmCloseButtonEl = DetailsFilmComponent.getElement().querySelector(`.film-details__close-btn`);

  detailsFilmCloseButtonEl.addEventListener(`click`, () => {
    closeDetailsFilm();
  });


  render(filmsListContainerElement, FilmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilms = (filmsElement, films) => {

  const filmsListElement = filmsElement.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  if (films.length === 0) {
    filmsListElement.replaceChildren(new FilmsEmpty().getElement());
    return;
  }

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilm(filmsListContainerElement, film);
    });

  const showMoreButtonComponent = new ShowMoreBtn();
  render(filmsListElement, showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => {
        renderFilm(filmsListContainerElement, film);
      });

    if (showingFilmsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.remove();
    }
  });

  if (TOP_RATED_FILMS_COUNT > 0) {
    const topRatedFilmsComponent = new TopRatedFilms();
    render(filmsElement, topRatedFilmsComponent.getElement());

    const topRatedFilmsContainerElement = topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

    const topRatedFilms = generateFilms(TOP_RATED_FILMS_COUNT);
    topRatedFilms.forEach((film) => {
      renderFilm(topRatedFilmsContainerElement, film);
    });
  }

  if (MOST_COMMENTED_FILMS_COUNT > 0) {
    const topMostCommentedFilmsComponent = new MostCommentedFilms();
    render(filmsElement, topMostCommentedFilmsComponent.getElement());

    const topMostCommentedFilmsContainerElement = topMostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

    const topMostCommentedFilms = generateFilms(MOST_COMMENTED_FILMS_COUNT);
    topMostCommentedFilms.forEach((film) => {
      renderFilm(topMostCommentedFilmsContainerElement, film);
    });
  }

};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserTitle().getElement());

const filmsComponent = new Films();
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new Menu().getElement());
render(siteMainElement, filmsComponent.getElement());

const films = generateFilms(FILMS_COUNT);

renderFilms(filmsComponent.getElement(), films);

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, new FooterStatistic().getElement());


