// import {Menu, Filter, Sort, Days, Day, Point, TripInfo, PointEdit} from '../components';
import {Menu, Filter, Sort, Days, Day, TripInfo, Trip} from '../components';
import {Position, render} from '../utils';
import moment from 'moment';
// import chart from 'chart.js';
import {PointController} from './Point-Controller';
import {StatsController} from './Stats-controller';
// data
import {defaultPoint} from '../data';
// import {pointPlaces} from '../data/places';
export class TripController {
  constructor(allPoints, pointPlaces, container) {
    this._container = container;
    this._days = new Days();
    this._menu = new Menu();
    this._filter = new Filter();
    this._sort = new Sort();
    this._pointPlaces = pointPlaces;
    this._tripInfo = new TripInfo(pointPlaces);
    // this._currentlyOpened = [];
    this._tripInfoBlock = document.querySelector(`.trip-main__trip-info`);
    this._tripControlsBlock = document.querySelector(`.trip-main__trip-controls`);

    this._tripBlock = new Trip();

    // this._tripEventsBlock = document.querySelector(`.trip-events`);
    this._tripEventsBlock = this._tripBlock.node.querySelector(`.trip-events`);

    this._totalPriceBlock = document.querySelector(`.trip-info__cost`);
    this._daysList = this._days.node;
    this._day = null;
    this._allPoints = allPoints;
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._SECTIONS = {
      stats: `stats`,
      table: `table`
    };
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onDataChange(defaultPoint(), null);
    });
    this._statsController = new StatsController(this._container, this._allPoints);
    this._statsBlock = this._statsController.stats.node;
  }

  _onDataChange(newData, oldData) {
    const idx = this._allPoints.findIndex((it) => it === oldData);
    if (newData === null) {
      this._allPoints.splice(idx, 1);
    } else if (oldData === null) {
      this._allPoints.unshift(newData);
    } else {
      this._allPoints[idx] = Object.assign({}, oldData, newData);
    }
    this._subscriptions.splice(0, this._subscriptions.length);
    this._renderEventsList(this._allPoints);
    this._statsController.updateCharts(this._allPoints);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => {
      subscription();
    });
  }

  _switchToStats() {
    this._tripEventsBlock.classList.add(`visually-hidden`);
    // this._tripEventsBlock.classList.remove(`trip-tabs__btn--active`);
    this._statsBlock.classList.remove(`visually-hidden`);
    // this._statsBlock.classList.add(`trip-tabs__btn--active`);
  }

  _switchToEvents() {
    this._tripEventsBlock.classList.remove(`visually-hidden`);
    // this._tripEventsBlock.classList.add(`trip-tabs__btn--active`);
    this._statsBlock.classList.add(`visually-hidden`);
    // this._statsBlock.classList.remove(`trip-tabs__btn--active`);
  }

  _renderEventsList(points) {
    this._days.remove();
    const uniquieDays = [...new Set(points.map((point) => moment.unix(point.startTime).format(`YYYY-MM-DD`)))];
    let daysFragment = null;
    daysFragment = document.createDocumentFragment();
    uniquieDays.forEach((uniquieDay) => {
      const curDayPoints = points.filter((it) => {
        return moment.unix(it.startTime).format(`YYYY-MM-DD`) === uniquieDay;
      });
      this._day = new Day(moment(uniquieDay, `YYYY-MM-DD`).unix(), curDayPoints.length, moment(uniquieDay, `YYYY-MM-DD`).format(`D`));
      let pointsFragment = null;
      pointsFragment = document.createDocumentFragment();
      const pointContainers = Array.from(this._day.node.querySelectorAll(`.trip-events__item`));

      for (let j = 0; j < pointContainers.length; j++) {
        // render(pointContainers[j], this._createPoint(curDayPoints[j]), Position.BEFOREEND);
        const pointCtrl = new PointController(pointContainers[j], curDayPoints[j], this._onDataChange, this._onChangeView);
        // this._subscriptions.push(pointCtrl.setDefaultView.bind(pointCtrl));
        this._subscriptions.push(pointCtrl.setDefaultView.bind(pointCtrl));
      }
      let dayPoints = this._day.node;
      render(dayPoints.querySelector(`.trip-events__list`), pointsFragment, Position.BEFOREEND);
      render(daysFragment, dayPoints, Position.BEFOREEND);
    });
    render(this._days.node, daysFragment, Position.BEFOREEND);
    render(this._tripEventsBlock, this._days.node, Position.BEFOREEND);
  }

  _setDefaultViewOnEsc(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      // this._pointEdit.resetForm();
      this._onChangeView();
    }
  }

  init() {
    // !!! не забудь включить
    this._switchToStats();

    render(this._container, this._tripBlock.node, Position.AFTERBEGIN);
    render(this._tripInfoBlock, this._tripInfo.node, Position.AFTERBEGIN);
    const _switchSections = (evt) => {
      this._menu.node.querySelectorAll(`.trip-tabs__btn`).forEach((tab) => {
        tab.classList.remove(`trip-tabs__btn--active`);
      });
      if (evt.target.dataset.section === this._SECTIONS.stats) {
        this._switchToStats();
      } else {
        this._switchToEvents();
      }
      evt.target.classList.add(`trip-tabs__btn--active`);
    };
    Array.from(this._menu.node.querySelectorAll(`.trip-tabs__btn`)).forEach((tab) => {
      tab.addEventListener(`click`, _switchSections);
    });
    render(this._tripControlsBlock, this._menu.node, Position.BEFOREEND);
    render(this._tripControlsBlock, this._filter.node, Position.BEFOREEND);
    render(this._tripEventsBlock, this._sort.node, Position.BEFOREEND);
    this._renderEventsList(this._allPoints.slice(0, this._allPoints.length).sort((a, b) => {
      if (a.destanation > b.destanation) {
        return 1;
      } else
      if (a.destanation < b.destanation) {
        return -1;
      } else {
        return 0;
      }
    }));
    // sort
    const onSortChange = (evt) => {
      // this._days.remove();
      switch (evt.srcElement.id) {
        case `sort-event`:
          this._renderEventsList(this._allPoints.slice(0, this._allPoints.length).sort((a, b) => {
            if (a.destanation > b.destanation) {
              return 1;
            } else
            if (a.destanation < b.destanation) {
              return -1;
            } else {
              return 0;
            }
          }));
          break;
        case `sort-time`:
          this._renderEventsList(this._allPoints.slice(0, this._allPoints.length).sort((a, b) => a.startTime - b.startTime));
          break;
        case `sort-price`:
          this._renderEventsList(this._allPoints.slice(0, this._allPoints.length).sort((a, b) => a.price - b.price));
          break;
        default:
          this._renderEventsList(this._allPoints);
          break;
      }
    };
    this._tripEventsBlock.querySelector(`.trip-sort`).addEventListener(`change`, onSortChange);
    this._filter.node.addEventListener(`change`, (evt) => {
      switch (evt.target.value) {
        case `future`:
          this._renderEventsList(this._allPoints.slice().filter((it) => it.startTime > (Date.now() / 1000)));
          break;
        case `past`:
          this._renderEventsList(this._allPoints.slice().filter((it) => it.startTime <= (Date.now() / 1000)));
          break;
        case `everything`:
          this._renderEventsList(this._allPoints);
          break;
        default:
          this._renderEventsList(this._allPoints);
          break;
      }
    });
    this._totalPriceBlock.textContent = `Total: € ${this._allPoints.slice().map((it) => it.price).reduce((accumulator, it) => accumulator + it)}`;
    const setDefaultViewOnEsc = this._setDefaultViewOnEsc.bind(this);
    document.addEventListener(`keydown`, setDefaultViewOnEsc);
  }
}
