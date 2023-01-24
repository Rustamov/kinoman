import Movie from "./models/movie";
import CommentModel from "./models/comment";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  createFilm(movie) {
    return this._load({
      url: `movies`,
      method: Method.POST,
      body: JSON.stringify(movie.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseMovie);
  }

  deleteFilm(id) {
    return this._load({
      url: `movies/${id}`,
      method: Method.DELETE
    });
  }

  updateFilm(id, data) {
    console.log(data, JSON.stringify(data.toRAW()));

    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then(Movie.parseMovie);
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE
    });
  }

  updateComments(movieId, data) {
    console.log(data, JSON.stringify(data.toRAW()));

    return this._load({
      url: `comments/${movieId}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then(CommentModel.parseComments);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
};

export default API;
