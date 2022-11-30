import { calendar, left, right } from './calendar/index.js';
import calendarOpen from './calendar/calendarOpen.js';

let containers = [...document.querySelectorAll('.container')];

containers.forEach((container) => {
  calendarOpen(container);
  calendar(container);

  left(container);
  right(container);
});
