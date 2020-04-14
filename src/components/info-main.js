import {getUnique} from "./utils.js";
export const tripInfoMainTemplate = (events) => {
  let cities = [];
  let fullCities = [];
  events.forEach((element) => {
    fullCities.push(element.cities);
  });
  cities = getUnique(fullCities);

  const title = `${cities.length > 3 ? `${fullCities[0]} &mdash; ... &mdash; ${fullCities[fullCities.length - 1]}` : `${fullCities[0]} &mdash; ${cities[1]} &mdash; ${fullCities[cities.length - 1]}`}`;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`
  );
};
