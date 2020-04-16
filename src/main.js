import InfoContainerComponent from "./components/info-container.js";
import InfoMainComponent from "./components/info-main.js";
import CostComponent from "./components/info-cost.js";
import NavigationComponent from "./components/main-nav.js";
import FilterComponent from "./components/main-filter.js";
import SortComponent from "./components/sorting.js";
import EventEditComponent from "./components/event-edit.js";
import DaysComponent from "./components/days-list.js";
import DayComponent from "./components/day.js";
import DayEventComponent from "./components/day-event.js";
import {generateEvents} from "./mock/event.js";
import {render, RenderPosition} from "./utils.js";

const COUNT_EVENT = 22;
const events = generateEvents(COUNT_EVENT);

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
