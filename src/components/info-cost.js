import AbstractComponent from "./abstract-component.js";

const tripInfoCostTemplate = (events) => {
  let price = 0;
  events.forEach((eventsList) => {
    eventsList.forEach((event) => {
      price += event.price;
      event.events.forEach((element) => {
        if (element.isChecked) {
          price += element.price;
        }
      });
    });
  });

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};

export default class Cost extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return tripInfoCostTemplate(this._events);
  }
}
