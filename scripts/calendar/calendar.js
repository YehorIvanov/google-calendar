import { getItem } from "../common/storage.js";
import { generateWeekRange, isInDisplayedWeek } from "../common/time.utils.js";
import { createNumbersArray } from "../common/createNumbersArray.js";

const renderRedLine = () => {
  const date = new Date();
  let toRemoveElem = document.querySelector(".calendar__red-line");
  toRemoveElem ? toRemoveElem.remove() : toRemoveElem;
  toRemoveElem = document.querySelector(".calendar__red-dot");
  toRemoveElem ? toRemoveElem.remove() : toRemoveElem;

  if (isInDisplayedWeek(date)) {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    let day = date.getDay();
    if (day === 0) {
      day = 7;
    }
    const container = document.querySelector(
      `[data-day="${day}"] [data-time="${hours}"]`
    );
    const redLineElem = document.createElement("div");
    redLineElem.classList.add("calendar__red-line");
    redLineElem.style.top = `${minutes}px`;
    container.appendChild(redLineElem);
    const redDotElem = document.createElement("div");
    redDotElem.classList.add("calendar__red-dot");
    redDotElem.style.top = `${minutes - 6}px`;
    container.appendChild(redDotElem);
  }
};

const generateDay = () => {
  const day = createNumbersArray(0, 23);
  const calendarDayElem = document.createElement("div");
  calendarDayElem.classList.add("calendar__day");
  day.forEach((elem) => {
    const calendarTimeSlotElem = document.createElement("div");
    calendarTimeSlotElem.classList.add("calendar__time-slot");
    calendarTimeSlotElem.dataset.time = elem;
    calendarDayElem.appendChild(calendarTimeSlotElem);
  });
  return calendarDayElem;
};

export const renderWeek = () => {
  const calendarWeekElem = document.querySelector(".calendar__week");
  calendarWeekElem.innerHTML = "";
  generateWeekRange(getItem("displayedWeekStart"))
    .map((elem) => elem.getDay())
    .forEach((elem) => {
      const day = generateDay();
      elem === 0 ? (day.dataset.day = 7) : (day.dataset.day = elem);
      calendarWeekElem.appendChild(day);
      window.scrollTo(0, 530);
    });
  renderRedLine();
  setInterval(renderRedLine, 60000);
};
