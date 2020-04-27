import AbstractComponent from "./abstract-component.js";

const tripDaysTemplate = () => {
  return (
    `<ul class="trip-days"> </ul>`
  );
};

export default class Days extends AbstractComponent {
  getTemplate() {
    return tripDaysTemplate();
  }
}
