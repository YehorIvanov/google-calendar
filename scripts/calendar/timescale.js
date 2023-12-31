import { createNumbersArray } from "../common/createNumbersArray.js";

export const renderTimescale = () => {
  const timeScale = createNumbersArray(1, 24);
  const timeScaleElem = document.querySelector(".calendar__time-scale");
  timeScale.forEach((elem, key) => {
    const timeSlotElem = document.createElement("div");
    timeSlotElem.classList.add("time-slot");
    const timeSlotTimeElem = document.createElement("span");
    timeSlotTimeElem.classList.add("time-slot__time");
    timeSlotTimeElem.innerHTML = `${new Date(2023, 0, 0, elem).getHours()}:00`;
    timeSlotElem.appendChild(timeSlotTimeElem);
    timeScaleElem.appendChild(timeSlotElem);
  });
};
