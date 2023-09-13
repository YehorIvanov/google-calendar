import { renderTimescale } from "./calendar/timescale.js";
import { renderWeek } from "./calendar/calendar.js";
import { renderHeader } from "./calendar/header.js";
import { initNavigation } from "./header/navigation.js";
import { setItem, storage } from "./common/storage.js";
import { getStartOfWeek } from "./common/time.utils.js";
import { initEventForm } from "./events/createEvent.js";
import { renderEvents } from "./events/events.js";

function initCalendar() {
  setItem("displayedWeekStart", getStartOfWeek(new Date()));
  renderHeader();
  renderTimescale();
  renderWeek();
  initNavigation();
  initEventForm();
  renderEvents();
}

export function updateCalendar() {
  renderHeader();
  renderEvents();
}

document.addEventListener("DOMContentLoaded", initCalendar);
window.addEventListener('storage', updateCalendar);
window.addEventListener('storage', ( () => {
  console.log('storage');
}));