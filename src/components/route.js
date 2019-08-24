// import {oneRoute} from '../data/route';
import {msToHoursMins} from '../components/utils';

const createRouteOffers = (offers) => {
  let offersHtml = ``;
  if (offers.length > 0) {
    offers.forEach((offer) => {
      offersHtml += `
      <li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>
      `.trim();
    });
  }
  return offersHtml;
};

export const createRouteComponent = ({startTime, duration, price, destanation, offers, icon}) => {
  const endTime = new Date(startTime + duration);
  startTime = new Date(startTime);
  duration = msToHoursMins(duration);
  return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${destanation}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTime.toISOString()}">${(startTime.getHours() < 10 ? `0` + startTime.getHours() : startTime.getHours())}:${(startTime.getMinutes() < 10 ? `0` + startTime.getMinutes() : startTime.getMinutes())}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTime.toISOString()}">${(endTime.getHours() < 10 ? `0` + endTime.getHours() : endTime.getHours())}:${(endTime.getMinutes() < 10 ? `0` + endTime.getMinutes() : endTime.getMinutes())}</time>
          </p>
          <p class="event__duration">${duration.hours}H ${duration.minutes}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createRouteOffers(offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `.trim();
};
