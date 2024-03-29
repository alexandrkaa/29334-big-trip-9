// import {formatDate} from '../utils';
import {AbstractComponent} from './AbstractComponent';
import moment from 'moment';

export class PointEdit extends AbstractComponent {
  constructor(routePlaces, {startTime, duration, price, destanation, offers, icon, photos, description, favorite, routeAction, routePlace}, props) {
    super(props);
    this._startTime = startTime;
    this._duration = duration;
    this._price = price;
    this._destanation = destanation;
    this._offers = offers;
    this._icon = icon;
    this._photos = photos;
    this._description = description;
    this._favorite = favorite;
    this._routeAction = routeAction;
    this._routePlaces = routePlaces;
    this._routePlace = routePlace;
    this._element = null;
  }

  getTemplate() {
    return `
    <li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._icon}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${this._routeAction}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._routePlace}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${this._routePlaces.map((place) => {
    return `<option value="${place.name}"></option>`.trim();
  }).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${moment.unix(this._startTime).format(`DD/MM/YYYY HH:mm`)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${moment.unix(this._startTime + this._duration).format(`DD/MM/YYYY HH:mm`)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._favorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${this._offers.map((offer) => {
    return `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" data-offer-price="${offer.price}" data-offer-name="${offer.name}" id="event-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${offer.selected ? `checked` : ``}>
                  <label class="event__offer-label" for="event-${offer.id}">
                    <span class="event__offer-title">${offer.name}</span>
                    &plus;
                    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>`.trim();
  }).join(``)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${this._destanation}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${this._photos.map((photo) => {
    return `<img class="event__photo" src="${photo}" alt="Event photo">`.trim();
  }).join(``)
}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `.trim();
  }

  get data() {
    const _formData = new FormData(this.node.querySelector(`.event--edit`));
    const eventType = _formData.get(`event-type`);
    const eventDestanation = `${_formData.get(`event-destination`)}`;
    const startTime = _formData.get(`event-start-time`);
    const endTime = _formData.get(`event-end-time`);
    const price = _formData.get(`event-price`);
    const isFavorite = _formData.get(`event-favorite`);
    const offers = Array.from(this.node.querySelectorAll(`.event__offer-checkbox`)).map((offer) => {
      return {
        id: offer.id,
        name: offer.getAttribute(`data-offer-name`),
        price: offer.getAttribute(`data-offer-price`),
        selected: offer.checked
      };
    });
    const photos = Array.from(this.node.querySelectorAll(`.event__photo`)).map(() => {
      // return photo.src;
      return `http://picsum.photos/300/150?r=${Math.random()}`;
    });
    const favorite = _formData.get(`event-favorite`) === `on` ? true : false;
    return {eventType, eventDestanation, startTime, endTime, price, isFavorite, offers, photos, favorite};
  }
}
