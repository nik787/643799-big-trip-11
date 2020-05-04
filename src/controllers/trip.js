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
      sortedEvents = sortEvents(showingEvents);
      break;
  }

  return sortedEvents;
};

const renderEvent = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
    pointController.render(event);
    return pointController;
  });
};

const renderDay = (container, eventsList, index, onDataChange, onViewChange) => {
  const tripDays = container.querySelector(`.trip-days`);
  const dayComponent = new DayComponent(eventsList, index);

  render(tripDays, dayComponent);
  const eventList = dayComponent.getElement().querySelector(`.trip-events__list`);
  renderEvent(eventList, eventsList, onDataChange, onViewChange);
};

const renderDays = (container, events, onDataChange, onViewChange) => {
  events.forEach((eventsList, index) => {
    renderDay(container, eventsList, index, onDataChange, onViewChange);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];

    this._noEventComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
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
    render(container, new DaysComponent());
    renderDays(container, sortEvt, this._onDataChange, this._onViewChange);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    const daysList = this._container.querySelector(`.trip-days`);
    daysList.innerHTML = ``;
    if (sortType === SortType.EVENT) {
      renderDays(this._container, sortedEvents, this._onDataChange);
    } else {
      renderDay(this._container, sortedEvents, ``, this._onDataChange);
    }
  }
  _onViewChange() {
    this._events.forEach((it) => {
      it.setDefaultView();
    });
  }
}
