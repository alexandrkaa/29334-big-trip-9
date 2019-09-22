import {Point, PointEdit} from '../components';
import {pointPlaces} from '../data/places';
import {pointActions} from '../data/point-actions';
import {Position, render} from '../utils';
import moment from 'moment';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export class PointController {
  constructor(container, pointData, onDataChange, onChangeView) {
    this._container = container;
    this._pointData = pointData;
    this._point = new Point(pointData);
    this._pointEdit = new PointEdit(pointPlaces, pointData);
    this._pointElement = this._point.node;
    this._pointEditElement = this._pointEdit.node;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._currentlyOpened = [];
    this.init();
  }

  setDefaultView() {
    if (this._container.contains(this._pointEdit.node)) {
      const routeDescripttihon = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
      const newData = {
        startTime: moment(this._pointEdit.data.startTime, `DD/MM/YYYY HH:mm`).unix(), // s
        duration: (moment(this._pointEdit.data.endTime, `DD/MM/YYYY HH:mm`).unix() - moment(this._pointEdit.data.startTime, `DD/MM/YYYY HH:mm`).unix()), // s
        price: parseInt(this._pointEdit.data.price, 10),
        destanation: `${Array.from(pointActions).find((it) => {
          return it.id === this._pointEdit.data.eventType;
        }).txt} ${this._pointEdit.data.eventDestanation}`,
        offers: this._pointEdit.data.offers,
        icon: `${this._pointEdit.data.eventType}.png`,
        photos: this._pointEdit.data.photos,
        description: routeDescripttihon.split(`.`).filter((str) => str !== ``).sort(() => 0.5 - Math.random()).slice(0, 3).join(`.`),
        favorite: this._pointEdit.data.favorite,
        routeAction: this._pointEdit.data.eventType,
        routePlace: this._pointEdit.data.eventDestanation,
      };
      this._onDataChange(newData, this._pointData);
      this._pointData = newData;
      this._point.remove();
      this._point = new Point(this._pointData);
      this._container.replaceChild(this._point.node, this._pointEdit.node);
      this._pointEdit = new PointEdit(pointPlaces, newData);
      this._activateListeners();
      this._activateFlatpickr();
    }
  }

  _setEditView() {
    if (this._container.contains(this._point.node)) {
      this._onChangeView.call(this);
      this._container.replaceChild(this._pointEdit.node, this._point.node);
    }
  }

  _activateListeners() {
    const setDefaultView = (evt) => {
      evt.preventDefault();
      this.setDefaultView.call(this);
    };
    const setEditView = this._setEditView.bind(this);
    const setDefaultViewOnEsc = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        // this._pointEdit.resetForm();
        if (this._container.contains(this._pointEdit.node)) {
          this._container.replaceChild(this._point.node, this._pointEdit.node);
        }
      }
    };
    this._pointEdit.node.querySelector(`.event--edit`).addEventListener(`submit`, setDefaultView);
    this._pointEdit.node.querySelector(`.event--edit`).addEventListener(`keydown`, setDefaultViewOnEsc);
    this._point.node.querySelector(`.event__rollup-btn`).addEventListener(`click`, setEditView);
  }

  _activateFlatpickr() {
    flatpickr(this._pointEdit.node.querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._pointData.startTime * 1000,
      altFormat: `d/m/Y H:i`,
      dateFormat: `d/m/Y H:i`,
      enableTime: true
    });

    flatpickr(this._pointEdit.node.querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: (this._pointData.startTime + this._pointData.duration) * 1000,
      altFormat: `d/m/Y H:i`,
      dateFormat: `d/m/Y H:i`,
      enableTime: true
    });
  }

  init() {
    this._activateListeners();
    this._activateFlatpickr();
    render(this._container, this._point.node, Position.BEFOREEND);
  }
}
