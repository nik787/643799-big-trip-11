import InfoContainerComponent from "./components/info-container.js";
import InfoMainComponent from "./components/info-main.js";
import CostComponent from "./components/info-cost.js";
import NavigationComponent from "./components/main-nav.js";
import FilterComponent from "./components/main-filter.js";
import SortComponent from "./components/sorting.js";
import NoEventsComponent from "./components/no-events.js";
import EventEditComponent from "./components/event-edit.js";
import DaysComponent from "./components/days-list.js";
import DayComponent from "./components/day.js";
import DayEventComponent from "./components/day-event.js";
import {generateEvents} from "./mock/event.js";
import {render, replace, RenderPosition} from "./utils/render.js";
import {sortEvents} from "./utils/common.js";

const COUNT_EVENT = 22;
const events = generateEvents(COUNT_EVENT);

const sortEvt = sortEvents(events);

const isAllEventsArchived = events.every((event) => event.isArchive);


const pageBody = document.querySelector(`.page-body`);
const pageHeader = pageBody.querySelector(`.page-header`);
const pageHeaderTripMain = pageHeader.querySelector(`.trip-main`);
const pageMain = pageBody.querySelector(`.page-body__page-main`);
const pageMainContainer = pageMain.querySelector(`.page-body__container`);
const tripEvents = pageMainContainer.querySelector(`.trip-events`);

const renderPageHeader = (eventList) => {
  const pageHeaderComponent = new InfoContainerComponent();
  render(pageHeaderTripMain, pageHeaderComponent, RenderPosition.AFTERBEGIN);
  const TripInfoContainer = pageHeaderTripMain.querySelector(`.trip-info`);
  render(TripInfoContainer, new InfoMainComponent(eventList));
  render(TripInfoContainer, new CostComponent(eventList));

  const tripMainControl = pageHeaderTripMain.querySelector(`.trip-main__trip-controls`);

  render(tripMainControl, new NavigationComponent(), RenderPosition.AFTERBEGIN);
  render(tripMainControl, new FilterComponent());
};

const renderPageMain = (evt) => {

  if (isAllEventsArchived) {
    render(tripEvents, new NoEventsComponent());
    return;
  }
  render(tripEvents, new SortComponent());
  render(tripEvents, new DaysComponent(evt));
  renderDays(evt);
};

const renderEvent = (component, event) => {

  const replaceEventToEdit = () => {
    replace(eventEditComponent, dayEventComponent);
  };

  const replaceEditToEvent = () => {
    replace(dayEventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const dayEventComponent = new DayEventComponent(event);
  dayEventComponent.setEditButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new EventEditComponent(event);
  eventEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(component, dayEventComponent);
};

const renderDay = (evt, index) => {
  const tripDays = tripEvents.querySelector(`.trip-days`);
  const dayComponent = new DayComponent(evt, index);
  render(tripDays, dayComponent);
  const eventList = dayComponent.getElement().querySelector(`.trip-events__list`);
  for (let i = 0; i < evt.length; i++) {
    renderEvent(eventList, evt[i]);
  }
};

const renderDays = (evt) => {
  evt.forEach((eventsList, index) => {
    renderDay(eventsList, index);
  });
};

renderPageHeader(sortEvt);
renderPageMain(sortEvt);
