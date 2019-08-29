import {AbstractComponent} from './AbstractComponent.js';

export class Empty extends AbstractComponent {
  constructor(props) {
    super(props);
    this._element = null;
  }

  getTemplate() {
    return `
      <section class="trip-events">
        <h2 class="visually-hidden">Trip events</h2>
        <p class="trip-events__msg">Click New Event to create your first point</p>
      </section>
    `.trim();
  }
}
