export const createEventsComponent = () => {
  return `
    <ul class="trip-days">
    </ul>
    `.trim();
};

import {createElement} from './utils';

export class Days {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `
      <ul class="trip-days">
      </ul>
    `.trim();
  }
}
