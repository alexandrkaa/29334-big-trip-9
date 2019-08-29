import {Menu, Filter, Days, Day, Point, TripInfo, PointEdit} from '../components';
import {Position, render, onEscPress} from '../components/utils';
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

  init() {
    const renderEventsList = () => {
      const daysFragment = document.createDocumentFragment();
      for (let i = 0; i < this._DAYS_NUM; i++) {
        this._day = new Day();
        const pointsFragment = document.createDocumentFragment();
        for (let j = 0; j < this._POINTS_NUM; j++) {
          render(pointsFragment, this._createPoint(onePoint()), Position.BEFOREEND);
        }
        let dayPoints = this._day.node;
        render(dayPoints.querySelector(`.trip-events__list`), pointsFragment, Position.BEFOREEND);
        render(daysFragment, dayPoints, Position.BEFOREEND);
      }
      render(this._daysList, daysFragment, Position.BEFOREEND);
      return this._daysList;
    };
    render(this._tripInfoBlock, this._tripInfo.node, Position.AFTERBEGIN);
    render(this._tripControlsBlock, this._menu.node, Position.BEFOREEND);
    render(this._tripControlsBlock, this._filter.node, Position.BEFOREEND);
    this._tripEventsBlock.appendChild(renderEventsList());
    this._totalPriceBlock.textContent = `Total: € ${this._totalPrice}`;
    document.addEventListener(`keydown`, onEscPress.bind(null, this._replacePoints.bind(null, this._currentlyOpened)));
  }
}
