import { getItem, setItem } from "../common/storage.js";
import { openPopup, closePopup } from "../common/popup.js";
import { isInDisplayedWeek } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";
import { isDeletable } from "./validation.js";

const weekElem = document.querySelector(".calendar__week");
const deleteEventBtn = document.querySelector(".delete-event-btn");
const editEventBtn = document.querySelector(".edit-event-btn");

function handleEventClick(event) {
  if (event.target.closest(".event")) {
    openPopup(event.clientX, event.clientY);
    setItem("eventIdToDelete", event.target.closest(".event").dataset.eventId);
    event.stopPropagation();
  } else if (event.target.closest(".calendar__time-slot")) {
    const startDate = new Date();
    startDate.setHours(event.target.dataset.time.toString().padStart(2, "0"));
    startDate.setMonth(new Date(getItem("displayedWeekStart")).getMonth());
    // startDate.setMonth(getItem("displayedWeekStart").getMonth());
    startDate.setDate(
      new Date(getItem("displayedWeekStart")).getDate() +
        +event.target.parentNode.dataset.day -
        1
    );
    const endDate = new Date(startDate);
    endDate.setHours(parseInt(event.target.dataset.time) + 1);
    openModal(event, { start: startDate, end: endDate });
  }
}

function removeEventsFromCalendar() {
  Array.from(document.querySelectorAll(".event")).forEach((elem) =>
    elem.remove()
  );
}

const createEventElement = (eventObj) => {
  const event = eventObj;
  event.start = new Date(event.start);
  event.end = new Date(event.end);
  const newEventElem = document.createElement("div");
  newEventElem.dataset.eventId = event.id;
  newEventElem.classList.add("event");
  newEventElem.classList.add(`event_${getItem('akcentColor')}`);
  newEventElem.innerHTML = `
    <div class="event__title">${event.title}</div>
    <div class="event__time">${event.start.getHours()}:${event.start.getMinutes()}-${event.end.getHours()}:${event.end.getMinutes()}</div>
    <div class="event__description">${event.description}</div>
  `;
  newEventElem.style.position = "absolute";
  newEventElem.style.top = `${event.start.getMinutes()}px`;
  newEventElem.style.height = `${(event.end - event.start) / (60 * 1000)}px`;
  newEventElem.addEventListener("click", handleEventClick);
  document
    .querySelector(
      `[data-day="${event.start.getDay() == 0 ? 7 : event.start.getDay()}"] [data-time="${event.start.getHours()}"]`
    )
    .appendChild(newEventElem);
};

export const renderEvents = () => {
  removeEventsFromCalendar();

  const displayedWeekStart = new Date(getItem("displayedWeekStart"));
  let eventsToRender = getItem("events");
  if (!Array.isArray(eventsToRender)) {
    setItem('events', []);
    eventsToRender = [];
  }
  eventsToRender
    .filter((elem) => {
      return isInDisplayedWeek(elem.start);
    })
    .forEach((elem) => {
      createEventElement(elem);
    });
};

function onDeleteEvent() {
  const eventsArr = getItem("events");
  const eventIdToDelete = getItem("eventIdToDelete");
  if (isDeletable(eventsArr, eventIdToDelete)) {
    const newEventsArr = eventsArr.filter((elem) => {
      return elem.id.toString() !== eventIdToDelete.toString();
    });
    setItem("events", newEventsArr);
    closePopup();
    renderEvents();
  } else {
    alert("Event start and duration must be a multiple of 15 minutes");
  }
}

function onEditeEvent(event) {
  event.stopPropagation();
  const eventsArr = getItem("events");
  const eventIdToEdit = getItem("eventIdToDelete");
  const eventToEdite = eventsArr.filter((elem) => {
    return elem.id.toString() === eventIdToEdit.toString();
  });
  closePopup();
  openModal(event, eventToEdite[0]);
}

deleteEventBtn.addEventListener("click", onDeleteEvent);
editEventBtn.addEventListener("click", onEditeEvent);
weekElem.addEventListener("click", handleEventClick);
