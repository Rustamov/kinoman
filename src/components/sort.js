import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by_date`,
  BY_RATING: `by_rating`,
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`
  );
};


export default class Sort extends AbstractComponent {

  getTemplate() {
    return createSortTemplate();
  }

  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();

  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      this.getElement().querySelectorAll(`.sort__button`).forEach((link) => {
        if (link.classList.contains(`sort__button--active`)) {
          link.classList.remove(`sort__button--active`);
        }
      });

      evt.target.classList.add(`sort__button--active`);

      handler(this._currentSortType);
    });
  }
}
