import {tripInfoContainerTemplate} from "./components/info-container.js";
import {tripInfoMainTemplate} from "./components/info-main.js";
import {tripInfoCostTemplate} from "./components/info-cost.js";
import {tripMainNavTemplate} from "./components/main-nav.js";
import {tripMainFilterTemplate} from "./components/main-filter.js";
import {tripSortTemplate} from "./components/sorting.js";
import {tripEventEditTemplate} from "./components/event-edit.js";
import {tripDaysListTemplate} from "./components/days-list.js";
import {tripDayTemplate} from "./components/day.js";
import {tripDayEventTemplate} from "./components/day-event.js";
import {generateEvents} from "./mock/event.js";
import {render, RenderPosition} from "./utils.js";

const COUNT_EVENT = 22;
const events = generateEvents(COUNT_EVENT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageBody = document.querySelector(`.page-body`);
const pageHeader = pageBody.querySelector(`.page-header`);
const pageHeaderTripMain = pageHeader.querySelector(`.trip-main`);

render(pageHeaderTripMain, tripInfoContainerTemplate(), `afterbegin`);

const TripInfoContainer = pageHeaderTripMain.querySelector(`.trip-info`);

render(TripInfoContainer, tripInfoMainTemplate(events));

const tripMainControl = pageHeaderTripMain.querySelector(`.trip-main__trip-controls`);
const tripMainNavTitle = tripMainControl.querySelector(`h2`);

render(tripMainNavTitle, tripMainNavTemplate(), `afterend`);
render(tripMainControl, tripMainFilterTemplate());

const pageMain = pageBody.querySelector(`.page-body__page-main`);
const pageMainContainer = pageMain.querySelector(`.page-body__container`);
const tripEvents = pageMainContainer.querySelector(`.trip-events`);

render(tripEvents, tripSortTemplate());
render(tripEvents, tripEventEditTemplate(events[0]));
render(tripEvents, tripDaysListTemplate());

const tripDays = tripEvents.querySelector(`.trip-days`);

render(tripDays, tripDayTemplate());

const tripDayEvents = tripDays.querySelector(`.trip-events__list`);

for (let i = 1; i < COUNT_EVENT; i++) {
  render(tripDayEvents, tripDayEventTemplate(events[i]));
}

let price = 0;

let priceEvents = tripDayEvents.querySelectorAll(`.event__price-value`);
priceEvents.forEach((element) => {
  price += +element.innerHTML;
});

render(TripInfoContainer, tripInfoCostTemplate(price));
