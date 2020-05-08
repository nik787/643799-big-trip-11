import {getDateString, getTimeString, getTimeDurationString} from "../utils/common.js";
import {typeEventsActivity} from "../mock/event.js";
import AbstractComponent from "./abstract-component.js";

const availableOffersTemplate = (offers) => {
  return offers.map((offer) => {
    return offer.isChecked ?
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>` : ``;
  }).join(``);
};

const tripDayEventTemplate = (event) => {
  const {type, dateFrom, dateTo, destination, basePrice, offers} = event;

  let types = type[0].toUpperCase() + type.slice(1);
  if (types === `Check`) {
    types = `Check`;
  } else {
    types = type[0].toUpperCase() + type.slice(1);
  }
  const title = typeEventsActivity.includes(types) ? `${types} in ${destination.name}` : `${types} to ${destination.name}`;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${types === `Check` ? `check-in` : types}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDateString(dateFrom)}T${getTimeString(dateFrom)}">${getTimeString(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getDateString(dateTo)}T${getTimeString(dateTo)}">${getTimeString(dateTo)}</time>
          </p>
          <p class="event__duration">${getTimeDurationString(dateFrom, dateTo)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${availableOffersTemplate(offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class DayEvent extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return tripDayEventTemplate(this._event);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
