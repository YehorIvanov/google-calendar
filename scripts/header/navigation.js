import { getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/time.utils.js";
import { renderEvents } from "../events/events.js";

const navElem = document.querySelector(".navigation");
const displayedMonthElem = document.querySelector(
  ".navigation__displayed-month"
);

function renderCurrentMonth() {
  displayedMonthElem.innerHTML = getDisplayedMonth(
    getItem("displayedWeekStart")
  );
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
}

const onChangeWeek = (event) => {
  switch (event.target.dataset.direction) {
    case "today": {
      setItem("displayedWeekStart", getStartOfWeek(new Date()));
      break;
    }
    case "prev": {
      setItem(
        "displayedWeekStart",
        new Date(
          getItem("displayedWeekStart").getTime() - 7 * 24 * 60 * 60 * 1000
        )
      );
      break;
    }
    case "next": {
      setItem(
        "displayedWeekStart",
        new Date(
          getItem("displayedWeekStart").getTime() + 7 * 24 * 60 * 60 * 1000
        )
      );
      break;
    }
  }
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  renderWeek();
  renderHeader();
  renderCurrentMonth();
  renderEvents();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener("click", onChangeWeek);
};

