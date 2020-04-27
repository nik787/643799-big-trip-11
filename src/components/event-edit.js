import AbstractComponent from "./abstract-component.js";
import {getDateString, getTimeString} from "../utils/utils.js";
import {typeEventsTranfer, typeEventsActivity, typeEvents} from "../mock/event.js";

const eventPhotosTemplate = (photos) => {
  return photos.map((photo) => {
    return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
  }).join(``);
};

const destinationTemplate = (event) => {
  const {photos, description} = event;
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${description ? `<p class="event__destination-description">${description}</p>` : ``}
      ${photos.length > 0 ?
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventPhotosTemplate(photos)}
        </div>
      </div>` : ``}
    </section>`
  );
};


const offersTemplate = (offers) => {
  return offers.map((offer) => {
    let isChecked = (offer.isChecked) ? `checked` : ``;

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${offer.type}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }).join(``);
};

const eventTypeTemplate = (types) => {
  return types.map((element) => {
    const _type = element.toLowerCase();

    return (
      `<div class="event__type-item">
        <input id="event-type-${_type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${_type}" ${typeEvents.includes(element) ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${_type}" for="event-type-${_type}-1">${element}</label>
      </div>`
    );
  }).join(``);
};

const tripEventEditTemplate = (event) => {
  const {type, cities, events, price, date} = event;

  let _price = price;
  const _dateStart = date.start;
  const _dateFinish = date.finish;
  events.forEach((element) => {
    _price += element.price;
  });
  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${eventTypeTemplate(typeEventsTranfer)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${eventTypeTemplate(typeEventsActivity)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type === `Check` ? `Check-in` : type} ${typeEventsActivity.includes(type) ? `in` : `to`}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cities}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="Saint Petersburg"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateString(_dateStart)} ${getTimeString(_dateStart)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateString(_dateFinish)} ${getTimeString(_dateFinish)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${_price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate(events)}
            </div>
          </section>
          ${destinationTemplate(event)}

        </section>
      </form>
    </li>`
  );
};

export default class EventEdit extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return tripEventEditTemplate(this._event);
  }
}
