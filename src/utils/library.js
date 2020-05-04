export const typeEventsTranfer = {
  taxi: `Taxi`,
  bus: `Bus`,
  train: `Train`,
  ship: `Ship`,
  transport: `Transport`,
  drive: `Drive`,
  flight: `Flight`
};
export const typeEventsActivity = {
  check: `Check-in`,
  sightseeing: `Sightseeing`,
  restaurant: `Restaurant`
};

export const typeEventsLabel = Object.assign(typeEventsTranfer, typeEventsActivity);
export const typeEvents = Object.keys(typeEventsLabel);
