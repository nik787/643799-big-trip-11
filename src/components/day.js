import {createElement, getMonthString} from "../utils.js";


const tripDayTemplate = (event, index) => {
  const {date} = event[0];

  const day = date.start.getDate();
  const month = getMonthString(date.start);
  const year = date.start.getFullYear();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${year}-${date.start.getMonth() + 1 < 10 ? `0${date.start.getMonth() + 1}` : date.start.getMonth()}-${day}">${month} ${day}</time>
      </div>
      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class Day {
  constructor(event, index) {
    this._event = event;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return tripDayTemplate(this._event, this._index);
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
