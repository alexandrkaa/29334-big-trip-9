import {AbstractComponent} from './AbstractComponent.js';

export class Trip extends AbstractComponent {
  constructor(props) {
    super(props);
    this._element = null;
  }

  getTemplate() {
    return `
    <div class="page-body__container">
      <section class="trip-events">
        <h2 class="visually-hidden">Trip events</h2>
      </section>
    </div>
    `.trim();
  }
}
