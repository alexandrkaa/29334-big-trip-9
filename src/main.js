import {createMenuComponent} from './components/menu';
import {createFilterComponent} from './components/filter';

import {createEventsComponent} from './components/events';
import {createEventComponent} from './components/event';
import {createRouteComponent} from './components/route';
import {getComponent, renderComponent} from './components/render';

import {createEventEditComponent} from './components/event-edit';
import {createTripInfoComponent} from './components/trip-info';

// data
import {oneRoute} from './data/route';
// console.log(oneRoute());

const tripInfoBlock = document.querySelector(`.trip-main__trip-info`);
const tripControlsBlock = document.querySelector(`.trip-main__trip-controls`);
const tripEventsBlock = document.querySelector(`.trip-events`);
const totalPriceBlock = document.querySelector(`.trip-info__cost`);
const eventsList = getComponent(createEventsComponent());
const routePoints = [];
let totalPrice = 0;
const renderEventsList = () => {
  const days = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    let routes = document.createDocumentFragment();
    for (let j = 0; j < 5; j++) {
      const routePoint = oneRoute();
      routePoints.push(routePoint);
      totalPrice += routePoint.price;
      routes.appendChild(getComponent(createRouteComponent(routePoint)));
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
renderComponent(tripEventsBlock, createEventEditComponent(), `beforeend`);
tripEventsBlock.appendChild(renderEventsList());
totalPriceBlock.textContent = `Total: € ${totalPrice}`;
