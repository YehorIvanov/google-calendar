import { getItem, setItem, storage } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__close-btn");

function clearEventForm() {
  eventFormElem.reset();
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

const isValidEvent = (newEventObj, eventsArr) => {
  let alertMassage = "";
  alertMassage = alertMassage.concat(
    newEventObj.title ? "" : "Title is requared \n"
  );
  alertMassage = alertMassage.concat(
    newEventObj.start < newEventObj.end
      ? ""
      : "The end time must be after the start time"
  );
  alertMassage = alertMassage.concat(
    newEventObj.end - newEventObj.start < 21600001
      ? ""
      : "The event cannot last more then 6 hours"
  );
  alertMassage = alertMassage.concat(
    newEventObj.start.getDate() === newEventObj.end.getDate() &&
      newEventObj.start.getMonth() === newEventObj.end.getMonth() &&
      newEventObj.start.getFullYear() === newEventObj.end.getFullYear()
      ? ""
      : "The event must start and end within the same day"
  );
  alertMassage = alertMassage.concat(
    eventsArr
      .filter((elem) => {
        return elem.id !== newEventObj.id;
      })
      .every((elem) => {
        return elem.start >= newEventObj.end || elem.end <= newEventObj.start;
      })
      ? ""
      : "Two events cannot overlap in time"
  );
  alertMassage = alertMassage.concat(
    newEventObj.start.getMinutes() % 15 !== 0 ||
      newEventObj.end.getMinutes() % 15 !== 0
      ? "The start of the event and the duration must be a multiple of 15 minutes"
      : ""
  );
  // alert(alertMassage);
  // console.log(!!alertMassage);
  if (!alertMassage) {
    return true;
  }
  alert(alertMassage);
  return false;
};

function onCreateEvent(event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(eventFormElem));
  const eventsArr = getItem("events");
  const newEventObj = {
    id: +formData.id,
    title: formData.title,
    description: formData.description,
    start: getDateTime(formData.date, formData.startTime),
    end: getDateTime(formData.date, formData.endTime),
  };

  if (isValidEvent(newEventObj, eventsArr)) {
    console.log("valid");
    if (!newEventObj.id) {
      newEventObj.id = Math.random();
      eventsArr.push(newEventObj);
    } else {
      const foundIndex = eventsArr.findIndex(
        (event) => event.id === newEventObj.id
      );
      eventsArr[foundIndex] = newEventObj;
    }
    setItem("events", eventsArr);
    onCloseEventForm();
    renderEvents();
  }

  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
  eventFormElem.addEventListener("submit", onCreateEvent);
  closeEventFormBtn.addEventListener("click", onCloseEventForm);
}
