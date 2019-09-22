// data
import {onePoint} from './data/one-point';
import {pointPlaces} from './data/places';

import {TripController} from './controllers/Trip-controller';

import {Stats} from './components';
import {render, Position} from './utils';
const tripController = new TripController(new Array(15).fill(``).map(() => onePoint()).sort((a, b) => a.startTime - b.startTime), pointPlaces);
tripController.init();
const stats = new Stats();
render(document.querySelector(`.trip-events`), stats.node, Position.BEFOREEND);
