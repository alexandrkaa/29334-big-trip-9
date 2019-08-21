import {randomInt} from '../components/utils';
import {routePoints} from './route-points';
import {routePlaces} from './places';
import {routeOffers} from './offers';

const routeDescripttihon = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

// const routePointsArr = Array.from(routePoints);
export const oneRoute = () => {
  const routePoint = Array.from(routePoints).sort(() => 0.5 - Math.random()).slice(0, 1)[0];
  const routePlace = routePlaces.filter((it) => it.type === routePoint.type).sort(() => 0.5 - Math.random()).slice(0, 1)[0];
  return {
    startTime: Date.now() + 1 + randomInt(100, 100 * 60) * 60 * 1000, //ms
    duration: randomInt(10, 600) * 60 * 1000, //ms
    price: (Math.floor(Math.random() * 100) + 1) * 10,
    // routePoint: routePointsArr[randomInt(0, routePointsArr.length - 1)],
    // routePoint: Array.from(routePoints).sort(() => 0.5 - Math.random()).slice(0, 1),
    // destanation: routePlaces.sort(() => 0.5 - Math.random()).slice(0, 1),
    destanation: `${routePoint.txt} ${routePlace.name}`,
    offers: routeOffers.sort(() => 0.5 - Math.random()).slice(0, randomInt(0, 2)),
    icon: routePoint.icon,
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: routeDescripttihon.split(`.`).filter((str) => str !== ``).sort(() => 0.5 - Math.random()).slice(0, 3),
    // place: routePlaces.sort(() => 0.5 - Math.random()).slice(0, 1)
  };
};
