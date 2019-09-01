// const context = require.context(`./components/`, true, /\/.*\.js$/);
// context.keys().forEach((it) => {
//   console.log(context.resolve(it));
// });

// import {Menu, Filter, Days, Day, Point, TripInfo, PointEdit} from './components';
// import {Position, render, onEscPress} from './components/utils';

// // data
// import {onePoint} from './data/one-point';
// import {pointPlaces} from './data/places';
// const DAYS_NUM = 3;
// const POINTS_NUM = 5;
// const days = new Days();
// const menu = new Menu();
// const filter = new Filter();
// const tripInfo = new TripInfo(pointPlaces);

// const tripInfoBlock = document.querySelector(`.trip-main__trip-info`);
// const tripControlsBlock = document.querySelector(`.trip-main__trip-controls`);
// const tripEventsBlock = document.querySelector(`.trip-events`);
// const totalPriceBlock = document.querySelector(`.trip-info__cost`);
// const daysList = days.node;
// const points = [];
// let totalPrice = 0;
// const currentlyOpened = [];

// const replacePoints = (views, evt) => {
//   evt.preventDefault();
//   views.forEach((view) => {
//     const {oldView, newView} = view;
//     oldView.parentNode.replaceChild(newView, oldView);
//     if (evt.type === `click`) {
//       currentlyOpened.push({oldView: newView, newView: oldView});
//     }
//     if (evt.type === `submit`) {
//       currentlyOpened.splice(currentlyOpened.findIndex((it) => {
//         return it.oldView === newView;
//       }), 1);
//     }
//   });
//   if (evt.type === `keydown`) {
//     currentlyOpened.splice(0, currentlyOpened.length);
//   }
// };

// const renderEventsList = () => {
//   const daysFragment = document.createDocumentFragment();
//   for (let i = 0; i < DAYS_NUM; i++) {
//     const day = new Day();
//     const routes = document.createDocumentFragment();
//     for (let j = 0; j < POINTS_NUM; j++) {
//       const pointData = onePoint();
//       const point = new Point(pointData);
//       const pointEdit = new PointEdit(pointPlaces, pointData);
//       const pointElement = point.node;
//       const pointEditElement = pointEdit.node;
//       pointEditElement.querySelector(`.event--edit`).addEventListener(`submit`, replacePoints.bind(null, [{oldView: pointEditElement, newView: pointElement}]));
//       pointEditElement.querySelector(`.event--edit`).addEventListener(`keydown`, onEscPress.bind(null, replacePoints.bind(null, [{oldView: pointEditElement, newView: pointElement}])));
//       pointElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, replacePoints.bind(null, [{oldView: pointElement, newView: pointEditElement}]));
//       points.push({pointData, pointElement, pointEditElement});
//       totalPrice += pointData.price;
//       render(routes, pointElement, Position.BEFOREEND);
//     }
//     let dayRoutes = day.node;
//     render(dayRoutes.querySelector(`.trip-events__list`), routes, Position.BEFOREEND);
//     render(daysFragment, dayRoutes, Position.BEFOREEND);
//   }
//   render(daysList, daysFragment, Position.BEFOREEND);
//   return daysList;
// };
// render(tripInfoBlock, tripInfo.node, Position.AFTERBEGIN);
// render(tripControlsBlock, menu.node, Position.BEFOREEND);
// render(tripControlsBlock, filter.node, Position.BEFOREEND);
// tripEventsBlock.appendChild(renderEventsList());
// totalPriceBlock.textContent = `Total: € ${totalPrice}`;
// document.addEventListener(`keydown`, onEscPress.bind(null, replacePoints.bind(null, currentlyOpened)));

import {TripController} from './controllers/Trip-controller';
const tripController = new TripController();
tripController.init();
