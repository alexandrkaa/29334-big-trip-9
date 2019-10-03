import {AbstractComponent} from './AbstractComponent';

export class TripInfo extends AbstractComponent {
  constructor(pointPlaces, props) {
    super(props);
    this._element = null;
    this._pointPlaces = pointPlaces.filter((place) => place.type === `transport`);
  }

  getTemplate() {
    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">${this._pointPlaces.sort(() => 0.5 - Math.random()).slice(0, 1)[0].name} &mdash; ... &mdash; ${this._pointPlaces.sort(() => 0.5 - Math.random()).slice(0, 1)[0].name}</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
      </div>
    `.trim();
  }
}
