import {getRandomDate, getRandomDuration} from "../utils/common.js";
import {getRandomIntegerNumber, getRandomArrayItem, getRandomArray} from "../utils/random.js";

const quantityPhotos = {
  MIN: 1,
  MAX: 5
};

const costEvent = {
  MIN: 0,
  MAX: 1000
};

const typeEventsTranfer = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`
];
const typeEventsActivity = [
  `Check`,
  `Sightseeing`,
  `Restaurant`
];

const typeEvents = [
  ...typeEventsTranfer,
  ...typeEventsActivity
];

const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

const availableOffers = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 30,
    isChecked: false
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    isChecked: false
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 15,
    isChecked: false
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 5,
    isChecked: false
  },
  {
    type: `train`,
    title: `Travel by train`,
    price: 40,
    isChecked: false
  }
];

const getRandomOffersIsChecked = (offers) => {
  offers.forEach((offer) => {
    offer.isChecked = Math.random() > 0.5;
  });
  return offers;
};

export const typeEventOffer = {
  taxi: getRandomArray(availableOffers),
  bus: getRandomArray(availableOffers),
  train: getRandomArray(availableOffers),
  ship: getRandomArray(availableOffers),
  transport: getRandomArray(availableOffers),
  drive: getRandomArray(availableOffers),
  flight: getRandomArray(availableOffers),
  check: getRandomArray(availableOffers),
  sightseeing: getRandomArray(availableOffers),
  restaurant: getRandomArray(availableOffers),
};

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

const generatePhotos = (count = quantityPhotos.MIN) => {
  const photos = [];

  for (let i = 0; i < count; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};
const getRandomDestination = () => {
  return {
    name: getRandomArrayItem(cities),
    description: getRandomArrayItem(description),
    pictures: generatePhotos(getRandomIntegerNumber(quantityPhotos.MIN, quantityPhotos.MAX))
  };
};

const sortDay = (a, b) => a.dateFrom.getDate() - b.dateFrom.getDate();

const generateEvent = () => {
  const typeName = getRandomArrayItem(typeEvents);
  const dateStart = getRandomDate();
  const dateFinish = getRandomDuration(dateStart);
  console.log(typeEventOffer[typeName.toLowerCase()]);

  return {
    type: typeName,
    dateFrom: dateStart,
    dateTo: dateFinish,
    destination: getRandomDestination(),
    basePrice: getRandomIntegerNumber(costEvent.MIN, costEvent.MAX),
    isFavorite: Math.random() > 0.5,
    offers: getRandomOffersIsChecked(typeEventOffer[typeName.toLowerCase()])
  };

};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent)
    .sort(sortDay);
};

export {generateEvent, generateEvents, availableOffers, typeEventsTranfer, typeEventsActivity, typeEvents};
