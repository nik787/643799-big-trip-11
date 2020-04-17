import {createElement, getUnique, getMounthString} from "../utils.js";

const tripInfoMainTemplate = (events) => {
  let cities = [];
  let fullCities = [];
  let days = [];
  events.forEach((element) => {
    fullCities.push(element.cities);
    days.push(element.date.start.getDate());
  });
  cities = getUnique(fullCities);
  const mounth = getMounthString(events[0].date.start);

  const title = `${cities.length > 3 ? `${fullCities[0]} &mdash; ... &mdash; ${fullCities[fullCities.length - 1]}` : `${fullCities[0]} &mdash; ${cities[1]} &mdash; ${fullCities[cities.length - 1]}`}`;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${mounth} ${days[0]}&nbsp;&mdash;&nbsp;${days[days.length - 1]}</p>
    </div>`
  );
};

export default class InfoMain {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return tripInfoMainTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
