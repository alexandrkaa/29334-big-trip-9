import {Position} from '../utils';

export class AbstractComponent {
  constructor(props) {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._props = props;
    this._node = null;
  }

  _getNode() {
    if (!this._node) {
      const template = document.createElement(`template`);
      template.insertAdjacentHTML(Position.AFTERBEGIN, this.getTemplate());
      this._node = template.children[0];
      // template.innerHTML = this.getTemplate();
      // console.log(template.content);
      // this._node = template.content;
    }

    return this._node;
  }

  remove() {
    this._node.remove();
    this._node = null;
  }

  get node() {
    const ret = this._getNode();
    return ret;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}
