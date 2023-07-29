export let storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: [
    {
      id: 0.7520027086457333,
      title: "Coffee with Hunny bun",
      description: "Some descriptionwe will  go to our most likley koffee shop",
      start: new Date("2023-07-27T09:10:00.000Z"),
      end: new Date("2023-07-27T11:30:00.000Z"),
    },
    {
      id: 0.7520027086457353,
      title: "Title",
      description: "Some description",
      start: new Date("2023-07-13T04:10:00.000Z"),
      end: new Date("2023-07-13T06:30:00.000Z"),
    },
  ],
};

export const setItem = (key, value) => {
  storage[key] = value;
};

export const getItem = (key) => {
  return storage[key];
};

const eventExample = {
  id: 0.7520027086457333,
  title: "Title",
  description: "Some description",
  start: new Date("2020-03-17T01:10:00.000Z"),
  end: new Date("2020-03-17T04:30:00.000Z"),
};
