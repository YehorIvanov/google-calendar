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

export const openModal = (event, date = new Date()) => {
  const dateInputElem = document.querySelector('[type="date"]');
  dateInputElem.value = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const startTimeInputElem = document.querySelector('[name="startTime"]');
  startTimeInputElem.value = `${date
    .getHours()
    .toString()
    .padStart(2, "0")}:00`;

  const endTimeInputElem = document.querySelector('[name="endTime"]');
  endTimeInputElem.value = `${(date.getHours() + 1)
    .toString()
    .padStart(2, "0")}:00`;

  addTimeOptionsToElement(document.querySelector("#startTime"));
  addTimeOptionsToElement(document.querySelector("#endTime"));
  modalElem.classList.remove("hidden");
  const createEventCloseBtnElem = document.querySelector(
    ".create-event__close-btn"
  );
  createEventCloseBtnElem.addEventListener("click", closeModal);
};
export const closeModal = () => {
  // const modalElem = document.querySelector('.modal');
  modalElem.classList.add("hidden");
};

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана
