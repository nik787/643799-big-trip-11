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

const pageBody = document.querySelector('.page-body');
const pageHeader = pageBody.querySelector('.page-header');
const pageHeaderTripMain = pageHeader.querySelector('.trip-main');

render(pageHeaderTripMain, tripInfoContainerTemplate(), `afterbegin`);

const TripInfoContainer = pageHeaderTripMain.querySelector('.trip-info');

render(TripInfoContainer, tripInfoMainTemplate());
render(TripInfoContainer, tripInfoCostTemplate());


