// import {createElement} from './utils';
import {AbstractComponent} from './AbstractComponent.js';
import moment from 'moment';

export class Day extends AbstractComponent {
  constructor(date, pointsNum, dayCounter, props) {
    super(props);
    this._element = null;
    this._date = date;
    this._pointsNum = pointsNum;
    this._dayCounter = dayCounter;
    // <li class="trip-events__item">
  }

  getTemplate() {
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._dayCounter}</span>
          <time class="day__date" datetime="${moment.unix(this._date / 1000).format(`YYYY-MM-DD`)}">${moment.unix(this._date / 1000).format(`MMM DD`)}</time>
        </div>
        <ul class="trip-events__list">
        ${new Array(this._pointsNum).fill(``).map(() => {
    return `<li class="trip-events__item"></li>`.trim();
  }).join(``)}
        </ul>
      </li>
    `.trim();
  }
}
