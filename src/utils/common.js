import {getRandomIntegerNumber} from "./random.js";
import moment from "moment";
import * as momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);
export const getRandomDate = (start = new Date(2020, 4, 1), end = new Date(2020, 5, 1)) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDate = (date, format = `-`) => {
  return moment(date).format(`YYYY${format}MM${format}DD`);
};

export const getRandomDuration = (date) => {
  return new Date(date.getTime() + getRandomIntegerNumber(600, 86000000));
};

export const getDateString = (date) => {
  return formatDate(date);
};

export const getTimeString = (date) => {
  return formatTime(date);
};

export const getMonthString = (date) => {
  return moment(date).format(`MMMM`);
};

export const getTimeDurationString = (timeStart, timeFinish) => {
  const start = moment(timeStart);
  const end = moment(timeFinish);
  const duration = moment.duration(end.diff(start)).format(`DD[D]HH[H]mm[M]`);

  return duration;
};

export const getUnique = (arr) => {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};

export const sortEvents = (array) => {
  let newArray = [];
  let dateArray = [];
  array.sort((a, b) => a.dateFrom - b.dateFrom);
  array.forEach((element) => {
    dateArray.push(element.dateFrom.getDate());
  });
  dateArray = getUnique(dateArray);
  for (let index = 0; index < dateArray.length; index++) {
    newArray[index] = [];
    for (let j = 0; j < array.length; j++) {
      if (dateArray[index] === array[j].dateFrom.getDate()) {
        newArray[index].push(array[j]);
      }
    }
  }
  return newArray;
};

export const isFuture = (date) => {
  return date > new Date();
};

export const isPast = (date) => {
  return date < new Date();
};
