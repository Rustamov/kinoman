import {FilterType} from "../const";

export const getFilmsByFilter = (films, filterType) => {
  let filteredFilms = films.slice();

  switch (filterType) {
    case FilterType.ALL:
      break;

    case FilterType.WATCHLIST:
      filteredFilms = filteredFilms.filter((film) => film.isOnWatchlist);
      break;

    case FilterType.HISTORY:
      filteredFilms = filteredFilms.filter((film) => film.isWatched);
      break;

    case FilterType.FAVORITES:
      filteredFilms = filteredFilms.filter((film) => film.isFavorite);
      break;

  }

  return filteredFilms;
};

