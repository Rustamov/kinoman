import {MONTH_NAMES} from "../const";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatReleaseDate = (date) => {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatCommentDate = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;
};

export const formatFilmDuration = (duration) => {
  const hours = duration > 59 ? Math.floor(duration / 60) : 0;
  const minutes = duration % 60;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const makeCounter = () => {
  let count = 0;

  return () => {
    return ++count;
  };
};
