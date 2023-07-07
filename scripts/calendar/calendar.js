// import { getItem } from '../common/storage.js';
import { generateWeekRange } from "../common/time.utils.js";
// import { renderEvents } from '../events/events.js';
import { createNumbersArray } from "../common/createNumbersArray.js";
import { getItem } from "../common/storage.js";

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
  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
};

export const renderWeek = () => {
  const calendarWeekElem = document.querySelector(".calendar__week");
  calendarWeekElem.innerHTML = "";
  // const week = 
  generateWeekRange(getItem("displayedWeekStart"))
    .map((elem) => elem.getDate())
    .forEach((elem) => {
      const day = generateDay();
      day.dataset.day = elem;
      calendarWeekElem.appendChild(day);
      window.scrollTo(0, 530);
    });
  // console.log(week);
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
};
