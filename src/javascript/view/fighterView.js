import View from "./view";

class FighterView extends View {
  constructor(fighter, isFighting = false, handleClick, handleCheckbox) {
    super();

    this.createFighter(fighter, isFighting, handleClick, handleCheckbox);
  }

  createFighter(fighter, isFighting, handleClick, handleCheckbox) {
    const { name, source, _id } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source, isFighting);

    const divElement = this.createElement({
      tagName: "div",
      className: "card-body"
    });
    divElement.append(nameElement);

    this.element = this.createElement({
      tagName: "div",
      className: "fighter card text-center"
    });

    this.element.append(imageElement, divElement);

    if (!isFighting) {
      const checkboxElement = this.createCheckbox(_id, handleCheckbox);
      this.element.append(checkboxElement);
      this.element.addEventListener(
        "click",
        event => handleClick(event, fighter),
        false
      );
    }
  }

  createName(name) {
    const nameElement = this.createElement({
      tagName: "h5",
      className: "card-title name"
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source, isFighting) {
    let attributes = {
      src: source
    };

    if (!isFighting) {
      attributes = {
        ...attributes,
        "data-toggle": "modal",
        "data-target": "#modal-wrapper"
      };
    }

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

    checkboxElement.addEventListener("change", e =>
      handleCheckbox(e.target.checked, id)
    );

    checkboxLabel.innerText = "Choose me!";
    checkboxWrapper.append(checkboxElement, checkboxLabel);

    return checkboxWrapper;
  }
}

export default FighterView;
