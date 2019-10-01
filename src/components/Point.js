// import {oneRoute} from '../data/route';
// import {msToHoursMins} from '../utils';
import {AbstractComponent} from './AbstractComponent.js';
import moment from 'moment';

export class Point extends AbstractComponent {
  constructor({startTime, duration, price, destanation, offers, icon}, props) {
    super(props);
    this._startTime = startTime;
    this._duration = duration;
    this._price = price;
    this._destanation = destanation;
    this._offers = offers;
    this._icon = icon;
    this._element = null;
  }

  getTemplate() {
    const dateDiff = moment.utc(this._duration * 1000);
    return `
    <!-- <li class="trip-events__item"> -->
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._icon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._destanation}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${moment.unix(this._startTime).format()}">${moment.unix(this._startTime).format(`HH:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${moment.unix((this._startTime + this._duration)).format()}">${moment.unix(this._startTime + this._duration).format(`HH:mm`)}</time>
          </p>
          <p class="event__duration">${dateDiff.format(`HH`)}H ${dateDiff.format(`mm`)}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._offers.map((offer) => {
    return `
            <li class="event__offer">
              <span class="event__offer-title">${offer.name}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </li>
            `.trim();
  }).join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    <!-- </li> -->
  `.trim();
  }
}
