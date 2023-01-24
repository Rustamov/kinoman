export default class Movie {
  constructor(data) {
    this.comments = data[`comments`];

    const filmInfo = data[`film_info`];
    const release = filmInfo[`release`];
    const userDetails = data[`user_details`];

    this.filmInfo = {
      actors: filmInfo[`actors`],
      ageRating: filmInfo[`age_rating`],
      alternativeTitle: filmInfo[`alternative_title`],
      description: filmInfo[`description`],
      director: filmInfo[`director`],
      genre: filmInfo[`genre`],
      poster: filmInfo[`poster`],

      release: {
        date: release[`date`] ? new Date(release[`date`]) : null,
        releaseCountry: release[`release_country`],
      },

      runtime: filmInfo[`runtime`],
      title: filmInfo[`title`],
      totalRating: filmInfo[`total_rating`],
      writers: filmInfo[`writers`],
    };

    this.id = data[`id`];

    this.userDetails = {
      isAlreadyWatched: Boolean(userDetails[`already_watched`]),
      isFavorite: Boolean(userDetails[`favorite`]),
      watchingDate: userDetails[`watching_date`] ? new Date(userDetails[`watching_date`]) : null,
      isOnWatchlist: Boolean(userDetails[`watchlist`]),
    };
  }

  toRAW() {
    const filmInfo = this.filmInfo;
    const release = filmInfo.release;
    const userDetails = this.userDetails;

    return {
      "comments": this.comments,

      "film_info": {
        "actors": filmInfo.actors,
        "age_rating": filmInfo.ageRating,
        "alternative_title": filmInfo.alternativeTitle,
        "description": filmInfo.description,
        "director": filmInfo.director,
        "genre": filmInfo.genre,
        "poster": filmInfo.poster,

        "release": {
          "date": release.date ? release.date.toISOString() : null,
          "release_country": release.releaseCountry,
        },

        "runtime": filmInfo.runtime,
        "title": filmInfo.title,
        "writers": filmInfo.writers,
        "total_rating": filmInfo.totalRating,
      },

      "id": this.id,

      "user_details": {
        "already_watched": userDetails.isAlreadyWatched,
        "favorite": userDetails.isFavorite,
        "watching_date": userDetails.watchingDate ? userDetails.watchingDate.toISOString() : null,
        "watchlist": userDetails.isOnWatchlist,
      },
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
