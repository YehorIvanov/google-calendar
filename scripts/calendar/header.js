import { getItem } from "../common/storage.js";
import { generateWeekRange, isInDisplayedWeek } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";

const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const renderHeader = () => {
  const calendarHeaderElem = document.querySelector(".calendar__header");
  calendarHeaderElem.innerHTML = "";
  const week = generateWeekRange(getItem("displayedWeekStart"));
  week.forEach((num, index) => {
    const dayNameElem = document.createElement("span");
    dayNameElem.innerHTML = daysOfWeek[index];
    dayNameElem.classList.add("day-label__day-name");
    const dayNamberElem = document.createElement("span");
    dayNamberElem.innerHTML = num.getDate();
    dayNamberElem.classList.add("day-label__day-namber");
    if (
      isInDisplayedWeek(new Date()) &&
      num.getDate() === new Date().getDate()
    ) {
      dayNamberElem.classList.add("day-label__day-namber_current");
      dayNamberElem.classList.add(`day-label__day-namber_current-${getItem('akcentColor')}`);
    }
    const dayLabelElem = document.createElement("div");
    dayLabelElem.classList.add("calendar__day-label", "day-label");
    dayLabelElem.append(dayNameElem, dayNamberElem);
    calendarHeaderElem.appendChild(dayLabelElem);
  });
};

const createEventBtnElem = document.querySelector(".create-event-btn");
const openModalBinded = openModal.bind(null, {});
createEventBtnElem.addEventListener("click", openModalBinded);
