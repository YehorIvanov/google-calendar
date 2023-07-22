import { getItem, setItem } from "../common/storage.js";
import { openPopup, closePopup } from "../common/popup.js";
import { isInDisplayedWeek } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";
import { isDeletable } from "./validation.js";

const weekElem = document.querySelector(".calendar__week");
const deleteEventBtn = document.querySelector(".delete-event-btn");
const editEventBtn = document.querySelector(".edit-event-btn");

function handleEventClick(event) {
  // // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // // установите eventIdToDelete с id события в storage

  if (event.target.closest(".event")) {
    openPopup(event.clientX, event.clientY);
    setItem("eventIdToDelete", event.target.closest(".event").dataset.eventId);
    event.stopPropagation();
  } else if (event.target.closest(".calendar__time-slot")) {
    const startDate = new Date();
    startDate.setHours(event.target.dataset.time.toString().padStart(2, "0"));
    startDate.setMonth(getItem("displayedWeekStart").getMonth());
    startDate.setDate(
      getItem("displayedWeekStart").getDate() +
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
  // ф-ция для удаления всех событий с календаря
}

const createEventElement = (event) => {
  const newEventElem = document.createElement("div");
  newEventElem.dataset.eventId = event.id;
  newEventElem.classList.add("event");
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
      `[data-day="${event.start.getDay()}"] [data-time="${event.start.getHours()}"]`
    )
    .appendChild(newEventElem);

  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
};

export const renderEvents = () => {
  removeEventsFromCalendar();

  const displayedWeekStart = new Date(getItem("displayedWeekStart"));
  // const displayedWeekEnd = new Date(
  //   displayedWeekStart.getTime() + 1000 * 60 * 60 * 24 * 7
  // );
  const eventsToRender = getItem("events");
  eventsToRender
    .filter((elem) => {
      return isInDisplayedWeek(elem.start);
    })
    .forEach((elem) => {
      createEventElement(elem);
    });
  // const newEventElem = document.createElement('div');
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
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
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
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
