import AbstractSmartComponent from "../components/abstract-smart-component";
import {FilterType} from "../const";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createFlterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
    ${name === FilterType.ALL ?
      `All movies` :
      `${capitalizeFirstLetter(name)} <span class="main-navigation__item-count">${count}</span>`
    }
    </a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFlterMarkup(it, it.active)).join(`\n`);

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class Menu extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._currentFilterType = FilterType.ALL;

    this._filterChangeHandler = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = new URL(evt.target.href).hash.slice(1);

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      this.getElement().querySelectorAll(`.main-navigation__item, .main-navigation__additional`).forEach((link) => {
        if (link.classList.contains(`main-navigation__item--active`)) {
          link.classList.remove(`main-navigation__item--active`);
        }
      });

      evt.target.classList.add(`main-navigation__item--active`);

      handler(this._currentFilterType);
    });

    this._filterChangeHandler = handler;
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this._filterChangeHandler);
  }


}
