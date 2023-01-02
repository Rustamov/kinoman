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
