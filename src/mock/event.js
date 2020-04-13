import {getRandomIntegerNumber, getRandomArrayItem, getRandomDate} from "../components/utils.js";

const typeEvents = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check`,
  `Sightseeing`,
  `Restaurant`
];

const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

const availableOffers = () =>[
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 30,
    isChecked: getRandomIntegerNumber(0, 3)
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    isChecked: getRandomIntegerNumber(0, 3)
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 15,
    isChecked: getRandomIntegerNumber(0, 3)
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 5,
    isChecked: getRandomIntegerNumber(0, 3)
  },
  {
    type: `train`,
    title: `Travel by train`,
    price: 40,
    isChecked: getRandomIntegerNumber(0, 3)
  }
];

const description = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const generatePhoto = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

const generatePhotos = (count = 1) => {
  return new Array(count)
    .fill(``)
    .map(generatePhoto);
};

const generateAvailableOffers = () => {
  return availableOffers();
};

const generateEvent = () => {
  const typeEvent = getRandomArrayItem(typeEvents);
  const citiesEvent = getRandomArrayItem(cities);
  return {
    type: typeEvent,
    cities: citiesEvent,
    title: `${typeEvent} to ${citiesEvent}`,
    events: generateAvailableOffers(),
    description: getRandomArrayItem(description),
    photos: generatePhotos(getRandomIntegerNumber(0, 4)),
    date: getRandomDate()
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents, availableOffers};
