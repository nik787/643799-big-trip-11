import {getTimeString, getTimeDurationString} from "./utils.js";

const availableOffersTemplate = (events) => {
  return events.map((event) => {
    return event.isChecked ?
      `<li class="event__offer">
        <span class="event__offer-title">${event.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${event.price}</span>
      </li>` : ``;
  }).join(``);
};

export const tripDayEventTemplate = (event) => {
  const {title, type, events, price, date} = event;
  let _price = price;
  const _dateStart = date.start;
  const _dateFinish = date.finish;

  events.forEach((element) => {
    if (element.isChecked) {
      _price += element.price;
    }
  });

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getTimeString(_dateStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getTimeString(_dateFinish)}</time>
          </p>
          <p class="event__duration">${getTimeDurationString(_dateStart, _dateFinish)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${_price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${availableOffersTemplate(events)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
