import SortComponent, {SortType} from "../components/sorting.js";
import NoEventsComponent from "../components/no-events.js";
import PointController from "./point.js";
import DaysComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import {render, replace} from "../utils/render.js";
import {sortEvents} from "../utils/common.js";

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = showingEvents.sort((b, a) => (a.date.finish - a.date.start) - (b.date.finish - b.date.start));
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SortType.EVENT:
      sortedEvents = showingEvents;
      break;
  }

  return sortedEvents;
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
  constructor(container, events) {
    this._container = container;
    this._events = events;

    this._noEventComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();
  }

  render() {
    const events = this._events;
    const container = this._container;
    const sortEvt = sortEvents(events);

    if (events.length < 1) {
      render(container, this._noEventComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, new DaysComponent(sortEvt));
    renderDays(container, sortEvt);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = getSortedEvents(events, sortType);
      const daysList = container.querySelector(`.trip-days`);
      daysList.innerHTML = ``;
      renderDay(container, sortedEvents);
      if (sortType === SortType.EVENT) {
        daysList.innerHTML = ``;
        render(container, new DaysComponent(sortEvt));
        renderDays(container, sortEvt);
      }
    });
  }
}
