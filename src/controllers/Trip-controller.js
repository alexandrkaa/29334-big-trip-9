import {Menu, Filter, Sort, Days, Day, Point, TripInfo, PointEdit} from '../components';
import {Position, render, unrender, onEscPress} from '../components/utils';
// data
import {onePoint} from '../data/one-point';
import {pointPlaces} from '../data/places';
export class TripController {
  constructor(container) {
    this._container = container;
    this._DAYS_NUM = 3;
    this._POINTS_NUM = 5;
    this._days = new Days();
    this._menu = new Menu();
    this._filter = new Filter();
    this._sort = new Sort();
    this._tripInfo = new TripInfo(pointPlaces);
    this._currentlyOpened = [];
    this._tripInfoBlock = document.querySelector(`.trip-main__trip-info`);
    this._tripControlsBlock = document.querySelector(`.trip-main__trip-controls`);
    this._tripEventsBlock = document.querySelector(`.trip-events`);
    this._totalPriceBlock = document.querySelector(`.trip-info__cost`);
    this._daysList = this._days.node;
    this._points = [];
    this._totalPrice = 0;
    this._day = null;
    this._allPoints = new Array(15).fill(``).map(() => onePoint());
  }

  _replacePoints(views, evt) {
    evt.preventDefault();
    views.forEach((view) => {
      const {oldView, newView} = view;
      oldView.parentNode.replaceChild(newView, oldView);
      if (evt.type === `click`) {
        this._currentlyOpened.push({
          oldView: newView,
          newView: oldView
        });
      }
      if (evt.type === `submit`) {
        this._currentlyOpened.splice(this._currentlyOpened.findIndex((it) => {
          return it.oldView === newView;
        }), 1);
      }
    });
    if (evt.type === `keydown`) {
      // почему тут теряется контекст???
      this._currentlyOpened.splice(0, this._currentlyOpened.length);
    }
  }

  _createPoint(pointData) {
    const point = new Point(pointData);
    const pointEdit = new PointEdit(pointPlaces, pointData);
    const pointElement = point.node;
    const pointEditElement = pointEdit.node;
    pointEditElement.querySelector(`.event--edit`).addEventListener(`submit`, this._replacePoints.bind(this, [{oldView: pointEditElement, newView: pointElement}]));
    pointEditElement.querySelector(`.event--edit`).addEventListener(`keydown`, onEscPress.bind(null, this._replacePoints.bind(this, [{oldView: pointEditElement, newView: pointElement}])));
    pointElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, this._replacePoints.bind(this, [{oldView: pointElement, newView: pointEditElement}]));
    this._points.push({pointData, pointElement, pointEditElement});
    this._totalPrice += pointData.price;
    return pointElement;
  }

  _renderEventsList(points) {
    let daysFragment = null;
    daysFragment = document.createDocumentFragment();
    let pointCnt = 0;
    for (let i = 0; i < this._DAYS_NUM; i++) {
      this._day = new Day();
      let pointsFragment = null;
      pointsFragment = document.createDocumentFragment();
      for (let j = 0; j < this._POINTS_NUM; j++) {
        render(pointsFragment, this._createPoint(points[pointCnt++]), Position.BEFOREEND);
      }
      let dayPoints = this._day.node;
      render(dayPoints.querySelector(`.trip-events__list`), pointsFragment, Position.BEFOREEND);
      render(daysFragment, dayPoints, Position.BEFOREEND);
    }
    render(this._days.node, daysFragment, Position.BEFOREEND);
    render(this._tripEventsBlock, this._days.node, Position.BEFOREEND);
  }

  init() {
    render(this._tripInfoBlock, this._tripInfo.node, Position.AFTERBEGIN);
    render(this._tripControlsBlock, this._menu.node, Position.BEFOREEND);
    render(this._tripControlsBlock, this._filter.node, Position.BEFOREEND);
    render(this._tripEventsBlock, this._sort.node, Position.BEFOREEND);
    this._renderEventsList(this._allPoints);
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
    this._totalPriceBlock.textContent = `Total: € ${this._totalPrice}`;
    document.addEventListener(`keydown`, onEscPress.bind(null, this._replacePoints.bind(null, this._currentlyOpened)));
  }
}
