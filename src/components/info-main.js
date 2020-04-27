import AbstractComponent from "./abstract-component.js";
import {getUnique, getMonthString} from "../utils/utils.js";

const tripInfoMainTemplate = (events) => {
  let cities = [];
  let fullCities = [];
  let days = [];
  events.forEach((eventList) => {
    eventList.forEach((event) => {
      fullCities.push(event.cities);
      days.push(event.date.start.getDate());
    });
  });
  cities = getUnique(fullCities);

  const mounth = getMonthString(events[0][0].date.start);

  const title = `${cities.length > 3 ? `${fullCities[0]} &mdash; ... &mdash; ${fullCities[fullCities.length - 1]}` : `${fullCities[0]} &mdash; ${cities[1]} &mdash; ${fullCities[cities.length - 1]}`}`;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${mounth} ${days[0]}&nbsp;&mdash;&nbsp;${days[days.length - 1]}</p>
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
