import { now, next, previous } from './calendar/index.js';
import calendarOpen from './calendar/calendarOpen.js';

let containers = [...document.querySelectorAll('.container')];

containers.forEach((container) => {
  calendarOpen(container);
  now(container);

  next(container);
  previous(container);
});
