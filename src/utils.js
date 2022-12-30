import {MONTH_NAMES} from "./const";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatReleaseDate = (date) => {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatCommentDate = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERGBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERGBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
