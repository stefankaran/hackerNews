const objectHasOwnProperty = (obj, prop) => (
  !!(Object.prototype.hasOwnProperty.call(obj, prop))
);

// eslint-disable-next-line no-restricted-globals
export const isNumber = value => !isNaN(value);

export const paramsIdHandler = (paramsObj) => {
  const id = 'id';
  const paramsId = paramsObj[id];

  if (!objectHasOwnProperty(paramsObj, id)) return 1; // Default Page

  if (!isNumber(paramsId)) return paramsId;

  return parseFloat(paramsId);
};

export const convertTime = (time) => {
  const newDate = new Date();
  const currentTime = Math.floor(newDate.getTime() / 1000);
  const seconds = currentTime - time;
  const minutes = seconds / 60;
  const hours = (minutes / 60).toFixed();
  const hoursHandler = parseFloat(hours) === 1 ? '' : 's';

  if (seconds > 2 * 24 * 3600) return 'a few days ago';
  if (seconds > 24 * 3600) return 'yesterday';
  if (seconds > 3600) return `${hours} hour${hoursHandler} ago`;
  if (seconds > 1800) return 'Half an hour ago';
  if (seconds > 60) return `${Math.floor(seconds / 60)} minutes ago`;

  return '';
};
