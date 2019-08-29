// import {createElement} from './utils';
import {AbstractComponent} from './AbstractComponent.js';

export class Day extends AbstractComponent {
  constructor(props) {
    super(props);
    this._element = null;
  }

  getTemplate() {
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">1</span>
          <time class="day__date" datetime="2019-03-18">MAR 18</time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>
    `.trim();
  }
}
