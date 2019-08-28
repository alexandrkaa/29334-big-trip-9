import {Menu, Filter, Days, Day, Route, TripInfo, RouteEdit} from './components/componetns';
import {Position, render} from './components/utils';

// data
import {oneRoute} from './data/route';
import {routePlaces} from './data/places';
const days = new Days();
// const routeEdit = new RouteEdit(routePlaces, oneRoute());
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
    const day = new Day();
    const routes = document.createDocumentFragment();
    for (let j = 0; j < 5; j++) {
      const routePoint = oneRoute();
      const route = new Route(routePoint);
      const routeEdit = new RouteEdit(routePlaces, routePoint);
      const routeElement = route.getElement();
      const routeEditElement = routeEdit.getElement();
      routeEditElement.querySelector(`.event--edit`).addEventListener(`submit`, () => {
        routeEditElement.parentNode.replaceChild(routeElement, routeEditElement);
      });
      routeElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        routeElement.parentNode.replaceChild(routeEditElement, routeElement);
      });
      routePoints.push(routePoint);
      totalPrice += routePoint.price;
      render(routes, routeElement, Position.BEFOREEND);
    }
    let dayRoutes = day.getElement();
    render(dayRoutes.querySelector(`.trip-events__list`), routes, Position.BEFOREEND);
    render(daysFragment, dayRoutes, Position.BEFOREEND);
  }
  render(daysList, daysFragment, Position.BEFOREEND);
  return daysList;
};
render(tripInfoBlock, tripInfo.getElement(), Position.AFTERBEGIN);
render(tripControlsBlock, menu.getElement(), Position.BEFOREEND);
render(tripControlsBlock, filter.getElement(), Position.BEFOREEND);
// render(tripEventsBlock, routeEdit.getElement(), Position.BEFOREEND);
tripEventsBlock.appendChild(renderEventsList());
totalPriceBlock.textContent = `Total: € ${totalPrice}`;
