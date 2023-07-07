import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const renderHeader = () => {
  const calendarHeaderElem = document.querySelector(".calendar__header");
  calendarHeaderElem.innerHTML = '';
  const week = generateWeekRange(getItem("displayedWeekStart"));
  week.forEach((num, index) => {

  const dayNameElem = document.createElement("span");
  dayNameElem.innerHTML = daysOfWeek[index];
  dayNameElem.classList.add("day-label__day-name");

  const dayNamberElem = document.createElement("span");
  dayNamberElem.innerHTML = num.getDate();
  dayNamberElem.classList.add("day-label__day-namber");

  const dayLabelElem = document.createElement("div");
  dayLabelElem.classList.add("calendar__day-label", "day-label");
  dayLabelElem.append(dayNameElem, dayNamberElem);
  calendarHeaderElem.appendChild(dayLabelElem);
  });



  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
const createEventBtnElem = document.querySelector('.create-event-btn');
createEventBtnElem.addEventListener('click', openModal);
