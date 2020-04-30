import SortComponent, {SortType} from "../components/sorting.js";
import NoEventsComponent from "../components/no-events.js";
import PointController from "./point.js";
import DaysComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import {render} from "../utils/render.js";
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
  return eventsList.map((event) => {
    const pointController = new PointController(eventList);

    pointController.render(event);

    return pointController;
  });
};

const renderDays = (container, events) => {
  events.forEach((eventsList, index) => {
    renderDay(container, eventsList, index);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];

    this._noEventComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;
    const container = this._container;
    const sortEvt = sortEvents(this._events);

    if (this._events.length < 1) {
      render(container, this._noEventComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, new DaysComponent(sortEvt));
    renderDays(container, sortEvt);
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    const daysList = this._container.querySelector(`.trip-days`);
    daysList.innerHTML = ``;
    renderDay(this._container, sortedEvents);
    if (sortType === SortType.EVENT) {
      daysList.innerHTML = ``;
      const sortEvt = sortEvents(this._events);
      render(this._container, new DaysComponent(sortEvt));
      renderDays(this._container, sortEvt);
    }
  }
}
