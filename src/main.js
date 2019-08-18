import {createMenuComponent} from './components/menu.js';
import {createFilterComponent} from './components/filter.js';
// import {createCardComponent} from './components/card.js';

import {createEventsComponent} from './components/events';
import {createEventComponent} from './components/event';
import {createRouteComponent} from './components/route';
import {getComponent, renderComponent} from './components/render';

import {createCardEditComponent} from './components/card-edit.js';
import {createTripInfoComponent} from './components/trip-info.js';

const tripInfoBlock = document.querySelector(`.trip-main__trip-info`);
const tripControlsBlock = document.querySelector(`.trip-main__trip-controls`);
const tripEventsBlock = document.querySelector(`.trip-events`);
const eventsList = getComponent(createEventsComponent());

const renderEventsList = () => {
  const days = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    let routes = document.createDocumentFragment();
    for (let j = 0; j < 5; j++) {
      routes.appendChild(getComponent(createRouteComponent()));
    }
    let day = getComponent(createEventComponent());
    day.querySelector(`.trip-events__list`).appendChild(routes);
    days.appendChild(day);
  }
  eventsList.appendChild(days);
  return eventsList;
};

renderComponent(tripInfoBlock, createTripInfoComponent(), `afterbegin`);
renderComponent(tripControlsBlock, createMenuComponent(), `beforeend`);
renderComponent(tripControlsBlock, createFilterComponent(), `beforeend`);
renderComponent(tripEventsBlock, createCardEditComponent(), `beforeend`);
tripEventsBlock.appendChild(renderEventsList());
