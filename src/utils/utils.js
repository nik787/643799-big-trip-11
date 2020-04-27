export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

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

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomArray = (array) => {
  const minElement = 1;
  const newArray = [];
  const count = getRandomIntegerNumber(minElement, array.length);
  for (let i = 0; i < count; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

export const getRandomDate = (start = new Date(2020, 4, 1), end = new Date()) => {
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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
