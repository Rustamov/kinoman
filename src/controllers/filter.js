import FilterComponent from '../components/filters';

import {RenderPosition, render, replace} from '../utils/render';
import {getFilmsByFilter} from '../utils/filter';
import {FilterType} from "../const";

export default class FilterController {
  constructor(container, movieModel) {
    this._container = container;
    this._movieModel = movieModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const oldFilterComponent = this._filterComponent;

    const container = this._container;
    const allFilms = this._movieModel.getFilmsAll();


    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        active: this._activeFilterType === filterType,
      };
    });

    this._filterComponent = new FilterComponent(filters);

    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldFilterComponent) {
      replace(this._filterComponent, oldFilterComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }

  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._movieModel.setFilterType(filterType);
  }

  getActiveFilterType() {
    return this._activeFilterType;
  }
}
