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

export const extractVideoId = (url: string) => {
  const regexLong = /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/;
  const regexShort = /youtu\.be\/([0-9A-Za-z_-]{11})(?:[%#?&]|$)/;

  if (regexLong.test(url)) {
    const match = url.match(regexLong);
    return match ? match[1] : null;
  } else if (regexShort.test(url)) {
    const match = url.match(regexShort);
    return match ? match[1] : null;
  } else {
    return null;
  }
};
