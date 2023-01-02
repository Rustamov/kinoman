import AbstractComponent from "../components/abstract-component";

const createFooterStatisticTemplate = () => {
  return (
    `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
  );
};

export default class FooterStatistic extends AbstractComponent {

  getTemplate() {
    return createFooterStatisticTemplate();
  }

}
