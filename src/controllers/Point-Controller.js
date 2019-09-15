import {Point, PointEdit} from '../components';
import {pointPlaces} from '../data/places';

export class PointController {
  constructor(container, pointData, onDataChange, onChangeView) {
    this._pointData = pointData;
    this._point = new Point(pointData);
    this._pointEdit = new PointEdit(pointPlaces, pointData);
    this._pointElement = this._point.node;
    this._pointEditElement = this._pointEdit.node;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
  }

  _createPoint(pointData) {
    const point = new Point(pointData);
    const pointEdit = new PointEdit(pointPlaces, pointData);
    const pointElement = point.node;
    const pointEditElement = pointEdit.node;
    const switchToEditElement = this._replacePoints.bind(this, [{
      oldView: pointElement,
      newView: pointEditElement
    }]);
    const switchToElement = this._replacePoints.bind(this, [{
      oldView: pointEditElement,
      newView: pointElement
    }]);
    pointEditElement.querySelector(`.event--edit`).addEventListener(`submit`, switchToElement);
    pointEditElement.querySelector(`.event--edit`).addEventListener(`keydown`, this._switchToElementOnEsc);
    pointElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, switchToEditElement);
    this._points.push({
      pointData,
      pointElement,
      pointEditElement
    });
    this._totalPrice += pointData.price;
    return pointElement;
  }
}
