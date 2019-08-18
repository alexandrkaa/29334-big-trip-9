export const getComponent = (markup) => {
  const htmlTemplate = document.createElement(`template`);
  htmlTemplate.innerHTML = markup.trim();
  return htmlTemplate.content.firstElementChild.cloneNode(true);
};

export const renderComponent = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};
