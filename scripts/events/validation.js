export const isValidEvent = (newEventObj, eventsArr) => {
  let alertMassage = "";
  alertMassage = alertMassage.concat(
    newEventObj.title ? "" : "Title is requared \n"
  );
  alertMassage = alertMassage.concat(
    newEventObj.start < newEventObj.end
      ? ""
      : "The end time must be after the start time \n"
  );
  alertMassage = alertMassage.concat(
    newEventObj.end - newEventObj.start < 21600001
      ? ""
      : "The event cannot last more then 6 hours \n"
  );
  alertMassage = alertMassage.concat(
    newEventObj.start.getDate() === newEventObj.end.getDate() &&
      newEventObj.start.getMonth() === newEventObj.end.getMonth() &&
      newEventObj.start.getFullYear() === newEventObj.end.getFullYear()
      ? ""
      : "The event must start and end within the same day \n"
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
      : "Two events cannot overlap in time \n"
  );
  alertMassage = alertMassage.concat(
    newEventObj.start.getMinutes() % 15 !== 0 ||
      newEventObj.end.getMinutes() % 15 !== 0
      ? "The start of the event and the duration must be a multiple of 15 minutes \n"
      : ""
  );
  if (!alertMassage) {
    return true;
  }
  alert(alertMassage);
  return false;
};

export const isDeletable = (eventsArr, eventIdToDelete) => {
  const timeToStartEvent =
    eventsArr.filter((elem) => {
      return elem.id.toString() == eventIdToDelete.toString();
    })[0].start - new Date();
  return timeToStartEvent < 900000;
};
