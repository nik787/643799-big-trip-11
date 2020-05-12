import {isFuture, isPast} from "./common.js";
import {FilterType} from "../const.js";

export const getFutureEvents = (events) => {
  return events.filter((event) => isFuture(event.dateFrom));
};

export const getPastEvents = (events) => {
  return events.filter((event) => isPast(event.dateFrom));
};

export const getEventsByFilter = (events, filterType) => {

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getFutureEvents(events);
    case FilterType.PAST:
      return getPastEvents(events);
  }

  return events;
};
