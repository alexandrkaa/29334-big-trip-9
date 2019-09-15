// data
import {onePoint} from './data/one-point';
import {pointPlaces} from './data/places';

import {TripController} from './controllers/Trip-controller';
const tripController = new TripController(new Array(15).fill(``).map(() => onePoint()).sort((a, b) => a.startTime - b.startTime), pointPlaces);
tripController.init();
