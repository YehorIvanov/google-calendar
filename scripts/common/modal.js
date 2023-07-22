const modalElem = document.querySelector(".modal");
// const modalContentElem = document.querySelector(".modal__content");

function addTimeOptionsToElement(element) {
  element.innerHTML = "";
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 15) {
      const option = document.createElement("option");
      option.value = `${i.toString().padStart(2, "0")}:${j
        .toString()
        .padStart(2, "0")}`;
      element.appendChild(option);
    }
  }
}

export const openModal = (
  event,
  {
    id,
    title = "",
    start = new Date(),
    end = new Date(new Date().setHours(new Date().getHours() + 1)),
    description = "",
  }
) => {
  if (id) {
    const idInputElem = document.querySelector('[name="id"]');
    idInputElem.value = id;
  }

  const dateInputElem = document.querySelector('[type="date"]');
  dateInputElem.value = `${start.getFullYear()}-${(start.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${start.getDate().toString().padStart(2, "0")}`;

  const startTimeInputElem = document.querySelector('[name="startTime"]');
  startTimeInputElem.value = `${start
    .getHours()
    .toString()
    .padStart(2, "0")}:00`;

  const endTimeInputElem = document.querySelector('[name="endTime"]');
  endTimeInputElem.value = `${end.getHours().toString().padStart(2, "0")}:00`;

  const titleInputElem = document.querySelector('[name="title"]');
  titleInputElem.value = title;

  const descriptionInputElem = document.querySelector('[name="description"]');
  descriptionInputElem.value = description;

  const eventFormSubmitElem = document.querySelector(".event-form__submit-btn");
  eventFormSubmitElem.innerHTML = "Save";

  addTimeOptionsToElement(document.querySelector("#startTime"));
  addTimeOptionsToElement(document.querySelector("#endTime"));
  modalElem.classList.remove("hidden");
  const createEventCloseBtnElem = document.querySelector(
    ".create-event__close-btn"
  );
  createEventCloseBtnElem.addEventListener("click", closeModal);
};
export const closeModal = () => {
  modalElem.classList.add("hidden");
};
