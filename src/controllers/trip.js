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
      sortedEvents = showingEvents.sort((b, a) => (a.dateTo - a.dateFrom) - (b.dateTo - b.dateFrom));
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case SortType.EVENT:
      sortedEvents = sortEvents(showingEvents);
      break;
  }

  return sortedEvents;
};

const renderEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
    pointController.render(event);
    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];
    this._showedEventControllers = [];

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

    let sortEvt = this._events.slice();
    sortEvt = sortEvents(sortEvt);


    if (this._events.length < 1) {
      render(container, this._noEventComponent);
      return;
    }
    render(container, this._sortComponent);

    render(container, this._daysComponent);

    sortEvt.forEach((event, index) => {
      const _dayComponent = new DayComponent(event, index, true);
      const _eventsList = _dayComponent.getElement().querySelector(`.trip-events__list`);
      render(this._daysComponent.getElement(), _dayComponent);
      const newEvents = renderEvents(_eventsList, event, this._onDataChange, this._onViewChange);
      this._showedEventControllers = this._showedEventControllers.concat(newEvents);
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);
    console.log(oldData);
    console.log(newData);


    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    this._daysComponent.getElement().innerHTML = ``;
    if (sortType === SortType.EVENT) {
      sortedEvents.forEach((event, index) => {
        const _dayComponent = new DayComponent(event, index, true);
        const _eventsList = _dayComponent.getElement().querySelector(`.trip-events__list`);
        render(this._daysComponent.getElement(), _dayComponent);
        const newEvents = renderEvents(_eventsList, event, this._onDataChange, this._onViewChange);
        this._showedEventControllers = this._showedEventControllers.concat(newEvents);
      });
    } else {
      const _dayComponent = new DayComponent(sortedEvents);
      const _eventsList = _dayComponent.getElement().querySelector(`.trip-events__list`);
      render(this._daysComponent.getElement(), _dayComponent);

      const newEvents = renderEvents(_eventsList, sortedEvents, this._onDataChange, this._onViewChange);
      this._showedEventControllers = newEvents;
    }

  }
  _onViewChange() {
    this._showedEventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }
}

