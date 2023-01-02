import AbstractComponent from "../components/abstract-component";

const createFilmsEmptyTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class FilmsEmpty extends AbstractComponent {

  getTemplate() {
    return createFilmsEmptyTemplate();
  }

}
