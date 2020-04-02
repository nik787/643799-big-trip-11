'use strict';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoContainerTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

const tripInfoMainTemplate = () => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`
  );
};

const tripInfoCostTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

const tripMainNavTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" href="#">Table</a>
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
    </nav>`
  );
};

const tripMainFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

const pageBody = document.querySelector('.page-body');
const pageHeader = pageBody.querySelector('.page-header');
const pageHeaderTripMain = pageHeader.querySelector('.trip-main');

render(pageHeaderTripMain, tripInfoContainerTemplate(), `afterbegin`);

const TripInfoContainer = pageHeaderTripMain.querySelector('.trip-info');

render(TripInfoContainer, tripInfoMainTemplate());
render(TripInfoContainer, tripInfoCostTemplate());

const tripMainControl = pageHeaderTripMain.querySelector('.trip-main__trip-controls');
const tripMainNavTitle = tripMainControl.querySelector('h2');

render(tripMainNavTitle, tripMainNavTemplate(), `afterend`);
render(tripMainControl, tripMainFilterTemplate());

