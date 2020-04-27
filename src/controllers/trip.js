import SortComponent from "../components/sorting.js";
import NoEventsComponent from "../components/no-events.js";
import EventEditComponent from "../components/event-edit.js";
import DaysComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import DayEventComponent from "../components/day-event.js";
import {render, replace} from "../utils/render.js";


const renderPageMain = (container, evt) => {
  evt.forEach((eventsList) => {
    const isAllEventsArchived = eventsList.every((event) => event.isArchive);
    if (isAllEventsArchived) {
      render(container, new NoEventsComponent());
      return;
    }
  });
  render(container, new SortComponent());
  render(container, new DaysComponent(evt));
  renderDays(container, evt);
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

const renderDay = (container, eventsList, index) => {
  const tripDays = container.querySelector(`.trip-days`);
  const dayComponent = new DayComponent(eventsList, index);
  render(tripDays, dayComponent);
  const eventList = dayComponent.getElement().querySelector(`.trip-events__list`);
  for (let i = 0; i < eventsList.length; i++) {
    renderEvent(eventList, eventsList[i]);
  }
};

const renderDays = (container, events) => {
  events.forEach((eventsList, index) => {
    renderDay(container, eventsList, index);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(events) {
    renderPageMain(this._container, events);
  }
}
