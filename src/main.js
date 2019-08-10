import {createMenuComponent} from './components/menu.js';
import {createFilterComponent} from './components/filter.js';
import {createCardComponent} from './components/card.js';
import {createCardEditComponent} from './components/card-edit.js';
import {createTripInfoComponent} from './components/trip-info.js';

const renderComponent = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

const tripInfoBlock = document.querySelector(`.trip-main__trip-info`);
const tripControlsBlock = document.querySelector(`.trip-main__trip-controls`);
const tripEventsBlock = document.querySelector(`.trip-events`);

renderComponent(tripInfoBlock, createTripInfoComponent(), `afterbegin`);
renderComponent(tripControlsBlock, createMenuComponent(), `beforeend`);
renderComponent(tripControlsBlock, createFilterComponent(), `beforeend`);
renderComponent(tripEventsBlock, createCardEditComponent(), `beforeend`);
for (let i = 0; i < 3; i++) {
  renderComponent(tripEventsBlock, createCardComponent(), `beforeend`);
}
