import { getItem } from "../common/storage.js";
import { generateWeekRange, isInDisplayedWeek } from "../common/time.utils.js";
import { createNumbersArray } from "../common/createNumbersArray.js";

const renderRedLine = () => {
  const date = new Date();
  if (isInDisplayedWeek(date)) {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    // const day = date.getDay();
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
  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
};

export const renderWeek = () => {
  const calendarWeekElem = document.querySelector(".calendar__week");
  calendarWeekElem.innerHTML = "";

  generateWeekRange(getItem("displayedWeekStart"))
    .map((elem) => elem.getDay())
    .forEach((elem) => {
      const day = generateDay();
      // day.dataset.day = elem;
      elem === 0 ? (day.dataset.day = 7) : (day.dataset.day = elem);
      calendarWeekElem.appendChild(day);
      window.scrollTo(0, 530);
    });

  // generateWeekRange(getItem("displayedWeekStart"))
  //   .map((elem) => elem.getDate())
  //   .forEach((elem) => {
  //     const day = generateDay();
  //     day.dataset.day = elem;
  //     calendarWeekElem.appendChild(day);
  //     window.scrollTo(0, 530);
  //   });
  // renderRedLine();
  setInterval(renderRedLine(), 60000);
  // console.log(week);
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
};
