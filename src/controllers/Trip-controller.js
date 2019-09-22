// import {Menu, Filter, Sort, Days, Day, Point, TripInfo, PointEdit} from '../components';
import {Menu, Filter, Sort, Days, Day, TripInfo} from '../components';
import {Position, render} from '../utils';
import moment from 'moment';
import {PointController} from './Point-Controller';
// data
// import {onePoint} from '../data/one-point';
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
    this._tripEventsBlock = document.querySelector(`.trip-events`);
    this._statsBlock = document.querySelector(`.statistics`);
    this._totalPriceBlock = document.querySelector(`.trip-info__cost`);
    this._daysList = this._days.node;
    this._day = null;
    this._allPoints = allPoints;
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _onDataChange(newData, oldData) {
    const idx = this._allPoints.findIndex((it) => it === oldData);
    this._allPoints[idx] = newData;
    // this._days.remove();
    // this._renderEventsList(this._allPoints);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => {
      subscription();
    });
  }

  _switchToStats() {
    this._tripEventsBlock.classList.add(`visually-hidden`);
    this._statsBlock.classList.remove(`visually-hidden`);
  }

  _switchToEvents() {
    this._tripEventsBlock.classList.remove(`visually-hidden`);
    this._statsBlock.classList.add(`visually-hidden`);
  }

  _renderEventsList(points) {
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
    render(this._tripInfoBlock, this._tripInfo.node, Position.AFTERBEGIN);
    render(this._tripControlsBlock, this._menu.node, Position.BEFOREEND);
    render(this._tripControlsBlock, this._filter.node, Position.BEFOREEND);
    render(this._tripEventsBlock, this._sort.node, Position.BEFOREEND);
    this._renderEventsList(this._allPoints);
    // sort
    this._tripEventsBlock.querySelector(`.trip-sort`).addEventListener(`change`, (evt) => {
      this._days.remove();
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
    });
    this._totalPriceBlock.textContent = `Total: € ${this._allPoints.slice().map((it) => it.price).reduce((accumulator, it) => accumulator + it)}`;
    const setDefaultViewOnEsc = this._setDefaultViewOnEsc.bind(this);
    document.addEventListener(`keydown`, setDefaultViewOnEsc);
  }
}
