// import {createMenuComponent} from './components/menu';
import {Menu} from './components/menu';
// import {createFilterComponent} from './components/filter';
import {Filter} from './components/filter';

// import {createEventsComponent} from './components/events';
import {Days} from './components/days';
import {Day} from './components/day';
// import {createRouteComponent} from './components/route';
import {Route} from './components/route';
import {getComponent, renderComponent, Position, render} from './components/utils';

// import {createEventEditComponent} from './components/event-edit';
import {RouteEdit} from './components/route-edit';
// import {createTripInfoComponent} from './components/trip-info';
import {TripInfo} from './components/trip-info';

// data
import {oneRoute} from './data/route';
import {routePlaces} from './data/places';
const day = new Day();
const days = new Days();
const routeEdit = new RouteEdit(routePlaces, oneRoute());
const menu = new Menu();
const filter = new Filter();
const tripInfo = new TripInfo(routePlaces);

const tripInfoBlock = document.querySelector(`.trip-main__trip-info`);
const tripControlsBlock = document.querySelector(`.trip-main__trip-controls`);
const tripEventsBlock = document.querySelector(`.trip-events`);
const totalPriceBlock = document.querySelector(`.trip-info__cost`);
const daysList = days.getElement();
const routePoints = [];
let totalPrice = 0;
const renderEventsList = () => {
  const daysFragment = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    let routes = document.createDocumentFragment();
    for (let j = 0; j < 5; j++) {
      const routePoint = oneRoute();
      const route = new Route(routePoint);
      routePoints.push(routePoint);
      totalPrice += routePoint.price;
      routes.appendChild(getComponent(route.getTemplate()));
    }
    let dayRoutes = getComponent(day.getTemplate());
    render(dayRoutes.querySelector(`.trip-events__list`), routes, Position.BEFOREEND);
    render(daysFragment, dayRoutes, Position.BEFOREEND);
  }
  render(daysList, daysFragment, Position.BEFOREEND);
  return daysList;
};
// renderComponent(tripInfoBlock, createTripInfoComponent(), Position.AFTERBEGIN);
render(tripInfoBlock, tripInfo.getElement(), Position.AFTERBEGIN);
// renderComponent(tripControlsBlock, createMenuComponent(), `beforeend`);
// renderComponent(tripControlsBlock, menu.getElement(), `beforeend`);
render(tripControlsBlock, menu.getElement(), Position.BEFOREEND);
// renderComponent(tripControlsBlock, createFilterComponent(), `beforeend`);
renderComponent(tripControlsBlock, filter.getTemplate(), Position.BEFOREEND);
// renderComponent(tripEventsBlock, createEventEditComponent(), `beforeend`);
renderComponent(tripEventsBlock, routeEdit.getTemplate(), Position.BEFOREEND);
tripEventsBlock.appendChild(renderEventsList());
totalPriceBlock.textContent = `Total: € ${totalPrice}`;
