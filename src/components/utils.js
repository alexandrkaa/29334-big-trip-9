export const randomInt = (min, max) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const msToHoursMins = (millis) => {
  const hours = Math.floor(((millis / 1000) / 60) / 60);
  const minutes = Math.floor(((millis / 1000) / 60) % 60);
  return {hours, minutes};
};
