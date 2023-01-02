import AbstractComponent from "../components/abstract-component";


const createShowMoreBtnTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractComponent {

  getTemplate() {
    return createShowMoreBtnTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

}
