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
export function setItem(key, value) {
  // if (typeof value === 'object' && value !== null) {
  //   value = JSON.stringify(value);
  // }
  // localStorage.setItem(key, value);
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key) {
  const storedValue = localStorage.getItem(key);
  const parsedValue = JSON.parse(storedValue);
  // try {
  //   const parsedValue = JSON.parse(storedValue);
  //   if (typeof parsedValue === 'string' && /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/.test(parsedValue)) {
  //     return new Date(parsedValue);
  //   }
  //   return parsedValue;
  // } catch (error) {
  //   return storedValue;
  // }
  return parsedValue;
}
// export const setItem = (key, value) => {
//   console.log(value, JSON.stringify(value), new Date(JSON.stringify(value)));
//   localStorage.setItem(key, JSON.stringify(value));
//   // storage[key] = value;
// };

// export const getItem = (key) => {
//   // return storage[key];
//   const value = JSON.parse(localStorage.getItem(key));
//   if (value ) {
//     return new Date(value);
//   }


//   return JSON.parse(localStorage.getItem(key));
// };

const eventExample = {
  id: 0.7520027086457333,
  title: "Title",
  description: "Some description",
  start: new Date("2020-03-17T01:10:00.000Z"),
  end: new Date("2020-03-17T04:30:00.000Z"),
};
