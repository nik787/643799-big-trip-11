import {getRandomIntegerNumber} from "./random.js";
const months = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `June`,
  `July`,
  `Aug`,
  `Sept`,
  `Oct`,
  `Nov`,
  `Dec`,
];

export const getRandomDate = (start = new Date(2020, 4, 1), end = new Date(2020, 5, 1)) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomDuration = (date) => {
  return new Date(date.getTime() + getRandomIntegerNumber(600, 3000000));
};

export const getDateString = (date, symbol = `/`) => {
  return `${date.getDate()}${symbol}${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}${symbol}${date.getFullYear().toString().slice(-2)}`;
};

export const getTimeString = (date) => {
  return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
};

export const getMonthString = (date) => {
  return months[date.getMonth()];
};

export const getTimeDurationString = (timeStart, timeFinish) => {
  const duration = timeFinish.getTime() - timeStart.getTime();
  const durationMinutes = Math.floor(duration / 60000);
  return `${durationMinutes}М`;
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
  array.sort((a, b) => a.date.start - b.date.start);
  array.forEach((element) => {
    dateArray.push(element.date.start.getDate());
  });
  dateArray = getUnique(dateArray);
  for (let index = 0; index < dateArray.length; index++) {
    newArray[index] = [];
    for (let j = 0; j < array.length; j++) {
      if (dateArray[index] === array[j].date.start.getDate()) {
        newArray[index].push(array[j]);
      }
    }
  }
  return newArray;
};
