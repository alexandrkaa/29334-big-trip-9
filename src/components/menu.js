import {AbstractComponent} from './AbstractComponent.js';

export class Menu extends AbstractComponent {
  constructor(props) {
    super(props);
    this._element = null;
  }

  getTemplate() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn" data-section="table" href="#">Table</a>
        <a class="trip-tabs__btn trip-tabs__btn--active"  data-section="stats" href="#">Stats</a>
      </nav>
    `.trim();
  }
}
