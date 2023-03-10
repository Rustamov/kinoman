import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

export const formatStattisticsFilmDuration = (duration) => {
  const hours = duration > 59 ? Math.floor(duration / 60) : 0;
  const minutes = duration % 60;

  return hours > 0 ?
    `${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span>`
    : `${minutes} <span class="statistic__item-description">m</span>`;
};

const getTopGenre = (films) => {
  const dataObj = {};

  films.forEach((film) => {
    const genres = film.genres;

    genres.forEach((genre) => {
      if (genre in dataObj) {
        dataObj[genre] += 1;
      } else {
        dataObj[genre] = 1;
      }
    });
  });

  let maxCountGenres = 0;
  let topGenre = ``;

  Object.keys(dataObj).forEach((genre) => {
    if (dataObj[genre] >= maxCountGenres) {
      topGenre = genre;
      maxCountGenres = dataObj[genre];
    }
  });

  return topGenre;
};

const createStatisticsTemplate = (films) => {

  const count = films.length;
  const totalDuration = films.reduce((acc, film) => acc + film.duration, 0);
  const topGenre = getTopGenre(films);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${count} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${formatStattisticsFilmDuration(totalDuration)}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(movieModel) {
    super();

    this._movieModel = movieModel;
    this._filteredFilms = null;
    this._graphic = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._movieModel.setDataChangeHandler(this._onDataChange);

    // this._subscribeOnEvents();
  }


  getTemplate() {
    return createStatisticsTemplate(this._getFilteredFilms());
  }

  _buildGraphic() {
    if (this._graphic) {
      this._graphic.destroy();
    }

    const films = this._getFilteredFilms();

    const dataObj = {};
    films.forEach((film) => {
      const genres = film.genres;

      genres.forEach((genre) => {
        if (genre in dataObj) {
          dataObj[genre] += 1;
        } else {
          dataObj[genre] = 1;
        }
      });
    });

    const dataLabels = Object.keys(dataObj);
    const dataSet = Object.values(dataObj);

    const BAR_HEIGHT = 70;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    // ?????????????????????? ?????????????????????? ???????????? canvas, ?????? ?????????????? ???? ???????????????????? ?????????????????? ??????????????????
    statisticCtx.height = BAR_HEIGHT * 5;

    this._graphic = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `bar`,
      data: {
        labels: dataLabels,
        datasets: [{
          data: dataSet,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
        }]
      },
      options: {
        indexAxis: `y`,
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 30,
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        },
        scales: {
          y: {
            ticks: {
              fontColor: `#ffffff`,
              padding: 60,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 24,
          },
          x: {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        },

      }
    });
  }

  show() {
    super.show();

    this._filteredFilms = null;
    this._buildGraphic();
  }

  _getFilteredFilms() {
    if (this._filteredFilms !== null) {
      return this._filteredFilms;
    }

    const films = this._movieModel.getFilmsAll().filter((film) => {
      if (film.isWatched) {
        return true;
      }

      return false;
    });

    this._filteredFilms = films;
    return films;
  }

  _upadteGraphics() {
    this._filteredFilms = null;

    this._buildGraphic();
  }

  _onDataChange() {
    this._filteredFilms = null;

    this.rerender();
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.statistic__period-input`)
      .addEventListener(`change`, () => {
        this._upadteGraphics();
      });
  }

  recoveryListeners() {

  }
}
