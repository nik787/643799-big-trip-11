import AbstractComponent from "./abstract-component.js";
import {getUnique, getMonthString} from "../utils/common.js";

const tripInfoMainTemplate = (events) => {
  let cities = [];
  let fullCities = [];
  let days = [];
  let mounth = ``;
  events.forEach((event) => {
    fullCities.push(event.destination.name);
    days.push(event.dateFrom.getDate());
  });
  cities = getUnique(fullCities);

  mounth = events.length > 0 ? getMonthString(events[0].dateFrom) : ``;
  let infoDates = events.length > 0 ? `${mounth} ${days[0]}&nbsp;&mdash;&nbsp;${days[days.length - 1]}` : ``;


  const title = events.length > 0 ? `${cities.length > 3 ? `${fullCities[0]} &mdash; ... &mdash; ${fullCities[fullCities.length - 1]}` : `${fullCities[0]} &mdash; ${cities[1]} &mdash; ${fullCities[cities.length - 1]}`}` : ``;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${infoDates}</p>
    </div>`
  );
};

export default class InfoMain extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return tripInfoMainTemplate(this._events);
  }
}
