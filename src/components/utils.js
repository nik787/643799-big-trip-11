const mounths = [
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

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomArray = (array) => {
  const minElement = 1;
  const newArray = [];
  const count = getRandomIntegerNumber(minElement, array.length);
  for (let i = 0; i < count; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

const getRandomDate = (start = new Date(2020, 4, 1), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomDuration = (date) => {
  return new Date(date.getTime() + getRandomIntegerNumber(600, 3000000));
};

const getDateString = (date, symbol = `/`) => {
  return `${date.getDate()}${symbol}${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}${symbol}${date.getFullYear().toString().slice(-2)}`;
};

const getTimeString = (date) => {
  return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
};

const getMounthString = (date) => {
  return mounths[date.getMonth()];
};

const getTimeDurationString = (timeStart, timeFinish) => {
  const duration = timeFinish.getTime() - timeStart.getTime();
  const durationMinutes = Math.floor(duration / 60000);
  return `${durationMinutes}М`;
};

const getUnique = (arr) => {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};

export {getRandomIntegerNumber, getRandomArrayItem, getRandomArray, getRandomDate, getRandomDuration, getDateString, getTimeString, getMounthString, getTimeDurationString, getUnique};
