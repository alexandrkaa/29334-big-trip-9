
// export const createTripInfoComponent = () => {
//   return `
//     <div class="trip-info__main">
//       <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>
//       <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
//     </div>
//   `;
// };

import {createElement} from './utils';

export class TripInfo {
  constructor(routePlaces) {
    this._element = null;
    this._routePlaces = routePlaces.filter((place) => place.type === `city`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">${this._routePlaces.sort(() => 0.5 - Math.random()).slice(0, 1)[0].name} &mdash; ... &mdash; ${this._routePlaces.sort(() => 0.5 - Math.random()).slice(0, 1)[0].name}</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
      </div>
    `.trim();
  }
}
