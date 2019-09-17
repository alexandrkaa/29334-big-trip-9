import {randomInt} from '../utils';
import {pointActions} from './point-actions';
import {pointPlaces} from './places';
import {pointOffers} from './offers';

const routeDescripttihon = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const onePoint = () => {
  const routeAction = Array.from(pointActions).sort(() => 0.5 - Math.random()).slice(0, 1)[0];
  const routePlace = pointPlaces.filter((it) => it.type === routeAction.type).sort(() => 0.5 - Math.random()).slice(0, 1)[0];
  return {
    // startTime: Date.now() + 1 + randomInt(100, 100 * 60) * 60 * 1000, // ms
    // duration: randomInt(10, 600) * 60 * 1000, // ms
    startTime: (Date.now() / 1000) + randomInt(100, 100 * 60) * 60, // s
    duration: randomInt(10, 600) * 60, // s
    price: (Math.floor(Math.random() * 100) + 1) * 10,
    destanation: `${routeAction.txt} ${routePlace.name}`,
    offers: pointOffers.sort(() => 0.5 - Math.random()).slice(0, randomInt(0, 2)),
    icon: routeAction.icon,
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: routeDescripttihon.split(`.`).filter((str) => str !== ``).sort(() => 0.5 - Math.random()).slice(0, 3).join(`.`),
    favorite: Boolean(Math.round(Math.random())),
    routeAction: routeAction.txt,
    routePlace: routePlace.name,
  };
};
