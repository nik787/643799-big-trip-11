import AbstractComponent from "./abstract-component.js";

const tripInfoContainerTemplate = () => `<section class="trip-main__trip-info  trip-info"></section>`;

export default class InfoContainer extends AbstractComponent {
  getTemplate() {
    return tripInfoContainerTemplate();
  }
}
