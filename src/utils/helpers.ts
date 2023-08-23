const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getPublishedDate = (date: string) => {
  const videoPublished = new Date(date);

  const day = videoPublished.getDate();
  const month = months[videoPublished.getMonth()];
  const year = videoPublished.getFullYear();

  return `${day} ${month}, ${year}`;
};
