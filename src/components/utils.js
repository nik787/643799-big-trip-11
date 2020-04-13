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
    newArray.push(getRandomArrayItem(array));
  }
  return newArray;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(1, 10);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export {getRandomIntegerNumber, getRandomArrayItem, getRandomArray, getRandomDate};
