import {createElement} from "../utils.js";

const tripInfoCostTemplate = (events) => {
  let price = 0;
  events.forEach((element) => {
    price += element.price;
    element.events.forEach((event) => {
      if (event.isChecked) {
        price += event.price;
      }
    });
  });

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};

export default class Cost {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return tripInfoCostTemplate(this._events);
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
