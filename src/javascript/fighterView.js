import View from "./view";

class FighterView extends View {
  constructor(fighter, handleClick, handleCheckbox) {
    super();

    this.createFighter(fighter, handleClick, handleCheckbox);
  }

  createFighter(fighter, handleClick, handleCheckbox) {
    const { name, source, _id } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const checkboxElement = this.createCheckbox(_id, handleCheckbox);

    const divElement = this.createElement({
      tagName: "div",
      className: "card-body"
    });
    divElement.append(nameElement);

    this.element = this.createElement({
      tagName: "div",
      className: "fighter card text-center"
    });

    this.element.append(imageElement, divElement, checkboxElement);
    this.element.addEventListener(
      "click",
      event => handleClick(event, fighter),
      false
    );
  }

  createName(name) {
    const nameElement = this.createElement({
      tagName: "h5",
      className: "card-title name"
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
    const attributes = {
      src: source,
      "data-toggle": "modal",
      "data-target": "#modal-wrapper"
    };
    const imgElement = this.createElement({
      tagName: "img",
      className: "fighter-image card-img-top",
      attributes
    });

    return imgElement;
  }

  createCheckbox(id, handleCheckbox) {
    const checkboxWrapper = this.createElement({
      tagName: "div",
      className: "form-check"
    });

    const checkboxElement = this.createElement({
      tagName: "input",
      className: "form-check-input",
      attributes: { type: "checkbox", id: `checkbox-${id}`, value: "" }
    });

    const checkboxLabel = this.createElement({
      tagName: "label",
      className: "form-check-label",
      attributes: { for: `checkbox-${id}` }
    });

    checkboxElement.addEventListener("change", (e) => handleCheckbox(e.target.checked, id))

    checkboxLabel.innerText = "Choose me!";
    checkboxWrapper.append(checkboxElement, checkboxLabel);

    return checkboxWrapper;
  }
}

export default FighterView;
