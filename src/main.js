import TripController from "./controllers/trip.js";
import InfoContainerComponent from "./components/info-container.js";
import InfoMainComponent from "./components/info-main.js";
import CostComponent from "./components/info-cost.js";
import NavigationComponent from "./components/main-nav.js";
import FilterController from "./controllers/filters.js";
import PointsModel from "./models/points.js";


import {generateEvents} from "./mock/event.js";
import {render, RenderPosition} from "./utils/render.js";

const COUNT_EVENT = 1;
const events = generateEvents(COUNT_EVENT);


const eventsModel = new PointsModel();
eventsModel.setEvents(events);

const pageBody = document.querySelector(`.page-body`);
const pageHeader = pageBody.querySelector(`.page-header`);
const pageHeaderTripMain = pageHeader.querySelector(`.trip-main`);
const pageMain = pageBody.querySelector(`.page-body__page-main`);
const pageMainContainer = pageMain.querySelector(`.page-body__container`);
const tripEvents = pageMainContainer.querySelector(`.trip-events`);

const renderPageHeader = (eventList) => {
  const pageHeaderComponent = new InfoContainerComponent();
  render(pageHeaderTripMain, pageHeaderComponent, RenderPosition.AFTERBEGIN);
  const TripInfoContainer = pageHeaderTripMain.querySelector(`.trip-info`);
  render(TripInfoContainer, new InfoMainComponent(eventList));
  render(TripInfoContainer, new CostComponent(eventList));

  const tripMainControl = pageHeaderTripMain.querySelector(`.trip-main__trip-controls`);

  render(tripMainControl, new NavigationComponent(), RenderPosition.AFTERBEGIN);
  const filterController = new FilterController(tripMainControl, eventsModel);
  filterController.render();
};


renderPageHeader(events);
const tripController = new TripController(tripEvents, eventsModel);

tripController.render();
