const METHOD = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const PATHS = {
  events: `points`,
  destinations: `destinations`,
  offers: `offers`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: PATHS.events})
    .then(toJSON)
    // .then(ModelEvent.parseEvents);
    .then((response) => {
      console.log(response);
    });
  }

  getDestinations() {
    return this._load({url: PATHS.destinations})
    .then(toJSON);
  }

  getOffers() {
    return this._load({url: PATHS.offers})
    .then(toJSON);
  }

  createEvent({point}) {
    return this._load({
      url: PATHS.events,
      method: METHOD.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  updateEvent({id, data}) {
    return this._load({
      url: `${PATHS.events}/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  deleteEvent({id}) {
    return this._load({ url: `${PATHS.events}/${id}`, method: METHOD.DELETE});
  }

  _load({url, method = METHOD.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        // eslint-disable-next-line
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
