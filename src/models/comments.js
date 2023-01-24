export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  addComments(movieId, comments) {
    this._comments[movieId] = comments;
  }

  getComments(movieId) {
    return this._comments[movieId];
  }

  addComment(movieId, comment) {
    this._comments[movieId] = [].concat(comment, this._comments[movieId]);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
