import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {getDateString, getTimeString} from "../utils/common.js";
import {typeEventsTranfer, typeEventsActivity, typeEventOffer, destinationList} from "../mock/event.js";

const eventPhotosTemplate = (pictures) => {
  return pictures.map((picture) => {
    return (`<img class="event__photo" src="${picture}" alt="Event photo">`);
  }).join(``);
};

const destinationTemplate = (destination) => {
  const {name} = destination;
  let description = ``;
  let pictures = [];
  destinationList.forEach((element) => {
    if (element.name.includes(name)) {
      description = element.description;
      pictures = element.pictures;
    }
  });

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
  const {type, destination, basePrice, dateFrom, dateTo, isFavorite, offers} = event;

  // const offers = typeEventOffer[type.toLowerCase()];
console.log(event);

  let types = type[0].toUpperCase() + type.slice(1);
  if (types === `Check`) {
    types = `Check`;
  } else {
    types = type[0].toUpperCase() + type.slice(1);
  }

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${types.toLowerCase() === `check` ? `check-in` : types.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${eventTypeTemplate(typeEventsTranfer, types)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${eventTypeTemplate(typeEventsActivity, types)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${types === `Check` ? `Check-in` : types[0].toUpperCase() + types.slice(1)} ${typeEventsActivity.includes(types[0].toUpperCase() + types.slice(1)) ? `in` : `to`}
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

const parseFormData = (formData) => {
  const offersList = formData.getAll(`checkbox`);
  console.log(offersList);


  return {
    type: formData.get(`event-type`),
    dateFrom: new Date(formData.get(`event-start-time`)),
    dateTo: new Date(formData.get(`event-end-time`)),
    destination: {
      name: formData.get(`event-destination`),
    },
    basePrice: formData.get(`event-price`),
    offers: offersList,
  };
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._originalEvent = event;
    this._event = Object.assign({}, event);

    this._flatpickr = null;
    this._submitHandler = null;
    this._resetHandler = null;
    this._favoriteCheckboxClickHandler = null;
    this._editButtonClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return tripEventEditTemplate(this._event);
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    this._event = Object.assign({}, this._originalEvent);

    this.rerender();
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
    const dateElementStart = this.getElement().querySelector(`#event-start-time-1`);
    const dateElementFinish = this.getElement().querySelector(`#event-end-time-1`);

    this._flatpickr = flatpickr(dateElementStart, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      altFormat: `d/m/y H:i`,
      defaultDate: this._event.dateFrom || `today`,
    });
    this._flatpickr = flatpickr(dateElementFinish, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      altFormat: `d/m/y H:i`,
      defaultDate: this._event.dateTo || `today`,
    });
  }


  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoriteCheckboxClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);
    this._favoriteCheckboxClickHandler = handler;
  }

  setResetHandler(handler) {
    this.getElement().addEventListener(`reset`, handler);
    this._resetHandler = handler;
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._editButtonClickHandler = handler;
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setResetHandler(this._resetHandler);
    this.setFavoriteCheckboxClickHandler(this._favoriteCheckboxClickHandler);
    this.setEditButtonClickHandler(this._editButtonClickHandler);

    this._subscribeOnEvents();
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-list input`).forEach((type) => {
      type.addEventListener(`click`, (evt) => {

        if (evt.target.value === `check-in`) {
          this._event.type = `Check`;
          console.log(this._event.type);

        } else {
          this._event.type = evt.target.value;
        }
        this._event.offers = typeEventOffer[this._event.type.toLowerCase()];
        console.log(this._event.offers);

        this._event.offers.forEach((offer) => {
          offer.isChecked = false;
        });
        this.rerender();
      });

    });

    element.querySelectorAll(`.event__offer-checkbox`).forEach((offer) => {
      offer.addEventListener(`click`, () => {
        if (offer.isChecked !== true) {
          offer.isChecked = true;
        } else {
          offer.isChecked = false;
        }
      });
    });

    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, (evt) => {
        this._event.basePrice = evt.target.value;
        this.rerender();
      });
  }
}
