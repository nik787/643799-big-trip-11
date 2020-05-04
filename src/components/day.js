import {getMonthString} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const tripDayTemplate = (event, index = ``) => {
  const {dateFrom} = event[0];
  const day = dateFrom.getDate();
  const month = getMonthString(dateFrom);
  const year = dateFrom.getFullYear();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index !== `` ? `${index + 1}` : ``}</span>
        <time class="day__date" datetime="${index !== `` ? `${year}-${dateFrom.getMonth() + 1 < 10 ? `0${dateFrom.getMonth() + 1}` : dateFrom.getMonth()}-${day}` : ``}">${index !== `` ? `${month} ${day}` : ``}</time>
      </div>
      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(event, index) {
    super();
    this._event = event;
    this._index = index;
  }

  getTemplate() {
    return tripDayTemplate(this._event, this._index);
  }
}
