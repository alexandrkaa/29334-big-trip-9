export const randomInt = (min, max) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// export const msToHoursMins = (millis) => {
//   const hours = Math.floor(((millis ) / 60) / 60);
//   const minutes = Math.floor(((millis ) / 60) % 60);
//   return {hours, minutes};
// };

export const getComponent = (markup) => {
  const htmlTemplate = document.createElement(`template`);
  htmlTemplate.innerHTML = markup.trim();
  return htmlTemplate.content.firstElementChild.cloneNode(true);
};

export const renderComponent = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

export const formatDate = (datetime) => {
  const date = new Date(datetime);
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Рендер и анрендер для компонент
export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

// export const unrender = (element) => {
//   if (element) {
//     element.remove();
//   }
// };

// const ESC_KEYCODE = 27;

// export const onEscPress = function (action, evt) {
//   // console.log(evt);
//   // console.log(action);
//   // console.log(evt.keyCode);
//   if (evt.keyCode === ESC_KEYCODE) {
//     evt.preventDefault();
//     if (action !== undefined && typeof action === `function`) {
//       action(evt);
//     }
//   }
// };
