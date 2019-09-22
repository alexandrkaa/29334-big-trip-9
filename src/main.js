// data
import {onePoint} from './data/one-point';
import {pointPlaces} from './data/places';

import {TripController} from './controllers/Trip-controller';

import {Stats} from './components';
import {render, Position} from './utils';
// const PAGE_BODY_CONTAINER = document.querySelector(`.page-body__page-main .page-body__container`);
const PAGE_BODY_CONTAINER = document.querySelector(`.page-body__page-main`);
const stats = new Stats();
render(PAGE_BODY_CONTAINER, stats.node, Position.BEFOREEND);
const tripController = new TripController(new Array(15).fill(``).map(() => onePoint()).sort((a, b) => a.startTime - b.startTime), pointPlaces, PAGE_BODY_CONTAINER);
tripController.init();
