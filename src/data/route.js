import {randomInt} from '../components/utils';
import {routePoints} from './route-points';
const routePointsArr = Array.from(routePoints);
export const oneRoute = () => {
  return {
    startTime: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    finishTime: Date.now() + 7 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    price: (Math.floor(Math.random() * 100) + 1) * 10,
    routePoint: routePointsArr[randomInt(0, routePointsArr.length - 1)]
  };
};
