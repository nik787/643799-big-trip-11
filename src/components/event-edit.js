import AbstractSmartComponent from "./abstract-smart-component.js";
import {getDateString, getTimeString} from "../utils/common.js";
import {typeEventsTranfer, typeEventsActivity, typeEventOffer} from "../mock/event.js";

const eventPhotosTemplate = (pictures) => {
  return pictures.map((picture) => {
    return (`<img class="event__photo" src="${picture}" alt="Event photo">`);
  }).join(``);
};

const destinationTemplate = (destination) => {
  const {pictures, description} = destination;
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${description ? `<p class="event__destination-description">${description}</p>` : ``}
      ${pictures.length > 0 ?
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventPhotosTemplate(pictures)}
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

const eventTypeTemplate = (types, eventType) => {

  return types.map((element) => {
    let type = element;

    if (type === `Check`) {
      type = `Check-in`;
    } else {
      type = type;
    }

    const _type = type.toLowerCase();

    return (
      `<div class="event__type-item">
        <input id="event-type-${_type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${_type}" ${_type === eventType.toLowerCase() ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${_type}" for="event-type-${_type}-1">${type}</label>
      </div>`
    );
  }).join(``);
};

const tripEventEditTemplate = (event) => {
  const {type, dateFrom, dateTo, destination, basePrice, isFavorite, offers} = event;
  let types = type;
  if (types === `Check`) {
    types = `Check-in`;
  } else {
    types = type;
  }

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${types.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${eventTypeTemplate(typeEventsTranfer, type)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${eventTypeTemplate(typeEventsActivity, type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type === `Check` ? `Check-in` : type[0].toUpperCase() + type.slice(1)} ${typeEventsActivity.includes(type[0].toUpperCase() + type.slice(1)) ? `in` : `to`}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
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
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateString(dateFrom)} ${getTimeString(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateString(dateTo)} ${getTimeString(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate(offers)}
            </div>
          </section>
          ${destinationTemplate(destination)}

        </section>
      </form>
    </li>`
  );
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._submitHandler = null;
    this._setCloseHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return tripEventEditTemplate(this._event);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setCloseHandler(this._setCloseHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const event = this._event;

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`.event--edit`)
      .addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
    this.rerender();
  }

  setCloseHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._setCloseHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const types = element.querySelectorAll(`.event__type-list input`);
    types.forEach((type) => {
      type.addEventListener(`click`, (evt) => {
        if (evt.target.value === `check-in`) {
          this._event.type = `Check`;
        } else {
          this._event.type = evt.target.value;
        }
        this._event.offers = typeEventOffer[this._event.type.toLowerCase()];

        this.rerender();
      });

    });
    const price = element.querySelector(`.event__input--price`);
    price.addEventListener(`change`, (evt) => {
      this._event.basePrice = evt.target.value;
      this.rerender();
    });
  }
}
