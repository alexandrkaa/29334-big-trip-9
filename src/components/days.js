import {AbstractComponent} from './AbstractComponent.js';

export class Days extends AbstractComponent {
  constructor(props) {
    super(props);
    this._element = null;
  }

  getTemplate() {
    return `
      <ul class="trip-days">
      </ul>
    `.trim();
  }
}
